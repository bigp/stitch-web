<template>
    <my-view>
        <portal to="extra-buttons">
            <btn icon="flask" @click="showFileBrowser()">Import Projects</btn>
        </portal>

        <field label="Client:" class="dropdown-client">
            <b-form-select 
                v-model="$app.current.client">
                <option :value="null">Select a client...</option>
                <option v-for="( client, k ) in catalog"
                    :key="k"
                    :value="k">{{k}}</option>
            </b-form-select>
        </field>
        
        <field label="Campaign:" class="dropdown-campaign">
            <b-form-select 
                v-model="$app.current.campaign">
                <option :value="null">Select a campaign...</option>
                <option v-for="( campaign, c ) in currentCampaigns"
                    :key="c"
                    :value="campaign">{{campaign}}</option>
            </b-form-select>
        </field>

        <field label="Project:" class="dropdown-project">
            <b-form-select
                @change="onProjectSelected"
                v-model="$app.current.project">
                <option :value="null">Select a project...</option>
                <option v-for="( project, p ) in currentProjects"
                    :key="p"
                    :value="project.name">{{project.name}}</option>
            </b-form-select>
        </field>

        <field label="Ad:" class="dropdown-ad">
            <b-form-select
                @change="onAdSelected"
                v-model="$app.current.ad">
                <option :value="null">Select an ad...</option>
                <option v-for="( ad, p ) in ads"
                    :key="p"
                    :value="ad">{{ad.name}}</option>
            </b-form-select>
        </field>

        <div class="ad-preview">
            <div class="timeline-slider" v-if="currentTimeline">
                <btn icon="undo-alt" @click="currentTimeline.play(0)"></btn>
                <div @click="onTimelineMouseDown" class="timeline-control">
                    <b-progress :max="1">
                        <b-progress-bar :value="currentTimeline.progress()"></b-progress-bar>
                    </b-progress>
                </div>
            </div>
            <iframe v-if="currentAdSize"
                :src="currentAdHTML"
                :style="{currentAdSize}"
                :width="currentAdSize.width"
                :height="currentAdSize.height">
            </iframe>
            
        </div>
        
        
    </my-view>
</template>

<script>
	export default {
        props: [],
        
        data() {
			return {
                driveLetters: [],
                json: {},
                catalog: {},
                ads: [],
                currentAdHTML: null,
                currentAdSize: null,
                currentTimeline: null,

				projectData: {
                    name: 'Hello Tree Data',
                    data: 'Hello-tree-data'
                }
			}
        },

		computed: {
            currentCampaigns() {
                if(!this.catalog || !this.$app.current.client) return [];
                
                return _.keys(this.catalog[this.$app.current.client].campaigns);
            },

            currentProjects() {
                if(!this.catalog || !this.currentCampaigns.length) return [];

                const campaigns = this.catalog[this.$app.current.client].campaigns;
                const campaign = campaigns[this.$app.current.campaign] || {};
                const projects = campaign.projects;

                if(!projects) return [];

                return projects;
            },
		},

		methods: {
			showFileBrowser() {
                this.$app.addPopup({name: 'popup-file-browser', data: {
                    driveLetters: this.driveLetters,
                    json: this.json,
                }}, answer => {
                    if(!answer) return;

                    this.onConfirmPathsToImport(answer);
                });
            },

            onConfirmPathsToImport(answer) {
                const dirs = answer.map(f => f.data);
                const obj = {dirs: dirs};

                $$$.api('api/projects/import-projects', obj)
                    .then( data => trace(data) )
                    .catch( err => this.onError(err, obj) );
            },

            onError(err, obj) {
                trace("Error on API data: ");
                trace(err.responseText || err);
                trace(obj);
            },

            fetchProjects() {
                const _this = this;
                
                return $$$.api('api/projects/list')
                    .then( data => {
                        _this.json = data.json;
                        _this.catalog = data.json.catalog;
                        _this.driveLetters = data.driveLetters;
                    } );
                    //.catch( err => trace(err) );
            },

            onProjectSelected(projectName) {
                const _this = this;
                const project = _this.currentProjects.find(f => f.name==projectName);
                
                $$$.api('api/projects/list-ads', {projectDir: project.path})
                    .then( data => {
                        _this.ads = data.ads;

                        const current = Cookies.getJSON('currentSelection');

                        if(current.ad) {
                            _this.onAdSelected(current.ad);
                        }
                    })
                    .catch( err => trace(err) );
            },

            onAdSelected(ad) {
                const prefix = location.protocol + '//' + location.host;
                const size = ad.name.match(/[0-9]+x[0-9]+/)[0];
                const sizeSplit = size.split('x');
            
                this.currentAdHTML = prefix + '/api/projects/load-ad?html=' + encodeURIComponent( ad.html );
                this.currentAdSize = {
                    display: 'block',
                    width: sizeSplit[0],
                    height: sizeSplit[1]
                };

                //trace(this.$app.current);

                Cookies.set('currentSelection', this.$app.current);

                setTimeout(() => {
                    const ad = $('.ad-preview iframe')[0];
                    trace(ad);
                    this.currentTimeline = ad.contentWindow.defaults.timeline;
                }, 500)
            },

            onTimelineMouseDown(e) {
                const target = $('.timeline-control');
                const progress = e.layerX / target.width();
                this.currentTimeline.progress(progress);
            }
        },
        
        mounted() {
            this.fetchProjects()
            .then( () => {
                const current = Cookies.getJSON('currentSelection');
                
                if(current && current.client) {
                    this.$app.current = current;
                    this.onProjectSelected(current.project);
                }
            })
        }
    }

</script>