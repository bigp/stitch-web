<template>
    <my-view>
        <portal to="left-buttons">
            <btn icon="arrow-right current-project" color="#fff" @click="showProjectBrowser()">{{currentProject.name}}</btn>
        </portal>
        <portal to="right-buttons">
            <btn icon="flask" @click="showFileBrowser()">Import Projects</btn>
        </portal>

        <!--<field label="Client:" class="dropdown-client">
            
             <b-dropdown :text="currentAd && currentAd.name ? currentAd.name : 'Select an Ad Brand &amp; Campaign'" v-if="catalog!=null"
                boundary="scrollParent"
                v-model="currentAd" class="m-2">
                <div v-for="(client, i) in catalog" :key="i">
                    <b-dropdown-header class="client-header"> {{i.replace(/_/g, ' ')}} </b-dropdown-header>
                    <b-dropdown-group v-for="(campaign, j) in client.campaigns" :key="j">
                        <b-dropdown-header class="campaign-header">{{j}}</b-dropdown-header>

                        <b-dropdown-item-button v-for="(project, p) in campaign.projects" :key="p"
                            class="project-header" @click="onProjectSelected(project.name)"
                            aria-describedby="dropdown-header-label">{{project.name}}
                        </b-dropdown-item-button>
                    </b-dropdown-group>
                </div>
            </b-dropdown> 
        </field>-->

        <div class="ad-preview">
            <div class="timeline-slider" v-if="currentAd.timeline">
                <btn :icon="currentAd.timeline.paused() ? 'play' : 'pause'" @click="onTogglePlayback"></btn>
                <btn icon="undo-alt" @click="currentAd.timeline.play(0)"></btn>
                <div @click="onTimelineMouseDown" class="timeline-control">
                    <b-progress :max="1">
                        <b-progress-bar :value="currentAd.progress"></b-progress-bar>
                    </b-progress>
                </div>
            </div>
            <iframe v-show="currentAd.size"
                @load="onIFrameLoaded"
                :src="currentAd.html"
                :style="{currentAdSize}"
                :width="currentAdSize.width"
                :height="currentAdSize.height">
            </iframe>
            
        </div>
        
        
    </my-view>
</template>

<script>

    const DUMMY_TIMELINE = {
        paused() { return true; },
        progress() { return 0; }
    };

	export default {
        props: [],
        
        data() {
			return {
                currentProject: {
                    name: "Select a project..."
                },

                currentAd: {
                    progress: 0,
                    html: null,
                    size: null,
                    timeline: null,
                },
			}
        },

		computed: {
            ...Vuex.mapGetters('catalog ads currentSelection'),

            currentCampaigns() {
                if(!this.catalog || !this.currentSelection.client) return [];
                
                return _.keys(this.catalog[this.currentSelection.client].campaigns);
            },

            currentProjects() {
                if(!this.catalog || !this.currentCampaigns.length) return [];

                const campaigns = this.catalog[this.currentSelection.client].campaigns;
                const campaign = campaigns[this.currentSelection.campaign] || {};
                const projects = campaign.projects;

                if(!projects) return [];

                return projects;
            },

            currentAdSize() {
                const defaultSize = {
                    width: 0,
                    height: 0
                };

                return this.currentAd.size ? this.currentAd.size : defaultSize;
            },
		},

		methods: {
            ...Vuex.mapActions("fetchAdsByProject cookieCurrentSelection"),

            resetCurrentAd() {
                const currentAd = this.currentAd;
                currentAd.timeline = DUMMY_TIMELINE;
                currentAd.html = '';
            },

            showProjectBrowser() {
                this.$app.addPopup({name: 'popup-project-selector', data: {
                    //driveLetters: this.driveLetters,
                    json: this.json,
                }}, selectedProject => {
                    if(!selectedProject) return;

                    this.onConfirmSelectedProject(selectedProject);
                });
            },

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

            onProjectSelected(projectName) {
                const _this = this;
                const project = _this.currentProjects.find(f => f.name==projectName);
                
                this.fetchAdsByProject( project );
            },

            onAdSelected(ad) {
                const prefix = location.protocol + '//' + location.host;
                const size = ad.name.match(/[0-9]+x[0-9]+/)[0];
                const sizeSplit = size.split('x');
                const currentAd = this.currentAd;

                //Set temporarly to a dummy timeline object that always returns (0) progress
                // (just for while the ad is loading)
                this.resetCurrentAd();

                // Adjust the size of the <iframe>'s CSS:
                currentAd.size = {
                    display: 'block',
                    width: sizeSplit[0],
                    height: sizeSplit[1]
                };

                // The <iframe>'s onload event will then trigger 'onIFrameLoaded(e)':
                currentAd.html = prefix + '/api/projects/load-ad?html=' + encodeURIComponent( ad.html );
            },

            onIFrameLoaded(e) {
                const _this = this;

                const trySetTimeline = () => {
                    const iframe = $('.ad-preview iframe')[0];
                    const timeline = _.get(iframe, 'contentWindow.defaults.timeline');
                    
                    if(!timeline) return requestAnimationFrame(trySetTimeline);

                    _this.currentAd.timeline = timeline;
                };

                trySetTimeline();
            },

            onTimelineMouseDown(e) {
                const target = $('.timeline-control');
                const progress = e.layerX / target.width();
                this.currentAd.timeline.progress(progress);
            },

            onTogglePlayback() {
                const timeline = this.currentAd.timeline;
                if(!timeline) return;

                if(timeline.paused()) timeline.resume();
                else timeline.pause();
            }
        },
        
        mounted() {
            const ad = this.currentAd;
            
            //Sync the progress-bar with the current Ad timeline (if it exists):
            this.$loopWhileMounted(() => ad.progress = ad.timeline ? ad.timeline.progress() : 0);

            this.showProjectBrowser();
            //this.showFileBrowser();

            //Upon first loading:
            // if(!this.$app.projectData) {
            //     $$$.once('@projects-list-loaded', data => _.assign(this, data));
            //     $$$.once('@projects-list-cookie', current => this.onProjectSelected(current.project) );
            // } else {
            //     _.assign(this, this.$app.projectData);
            //     this.onProjectSelected(this.$app.current.project);
            // }
        }
    }

</script>