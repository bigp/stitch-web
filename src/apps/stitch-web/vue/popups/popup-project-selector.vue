<template>
    <popup title="Project Selector">
        <div class="control-bar">
            <!-- inline-block -->
            <i class="control-item">Client:
                <b-form-select v-model="selectedClientName" :options="clientNames"></b-form-select>
            </i>

            <!-- <i class="control-item"><b>Sort by:</b>
                <b-form-select v-model="projectsSortType" :options="sortProjectsOptions"></b-form-select>
            </i> -->

            <b-dropdown id="dd-project-command" text="Project &amp; Campaign Commands...">
                <b-dropdown-item v-for="(cmd, c) in projectCommands" :key="c" href="#" @click="cmd.cb()">
                    <i v-if="cmd.icon" :class="'fa fa-' + cmd.icon">&nbsp;</i>{{cmd.name}}
                </b-dropdown-item>
            </b-dropdown>
        </div>

        <div class="scroll-list">
            <div v-for="(camp, c) in sortCampaigns(campaigns)" :key="c"
                class="campaign-card">
                <i class="campaign-name nowrap">
                    <i>{{camp.name}}</i>
                    <i class="mini-controls">
                        <btn icon="plus" color="#0a0" :title="'Add a new project to ' + camp.name"
                            @click="onAddProjectToCampaign(camp)"></btn>
                    </i>
                </i>
                <i class="campaign-logo"><img :src="camp.logo || '/images/logo_' + camp.name + '.jpg'" /></i>
                <ul class="campaign-projects">
                    <li v-for="(project, p) in sortProjects(camp.projects)" :key="p"
                        class="project-item nowrap">
                        <input type="checkbox" v-model="project.isChecked">
                        <i @click="onProjectClicked(project)">{{project.name}} </i>
                    </li>
                </ul>
            </div>
        </div>

        <template #button-bar>
            <!-- <btn @click="$app.popupMan.dismissPopup(selectedPaths)"
                icon="check"
                color="#080">Confirm</btn> -->
                <i class="status" > <!-- v-if="status" v-html="status" -->

                </i>
        </template>
    </popup>
        
</template>

<script>

var _this;

export default {
    props: [],

    data() {
        return {
            selected: {
                client:0,
                sortProjects:0,
            },

            sortProjectsOptions: ["Alphabetically", "Recently Created", "Recently Accessed"],
            projectCommands: [
                {icon: 'plus', name: 'Add Campaign', cb: () => this.onAddCampaign() },
                {icon: 'image', name: 'Open Logos folder...', cb: () => this.onOpenLogos()},
            ]
        }
    },
    
    computed: {
        ...Vuex.mapGetters('*'),

        clientNames() {
            return _.keys(this.catalog) || [];
        },

        campaigns() {
            return _.get(this.catalog, this.selectedClientName + ".campaigns") || {};
        },

        projects() {
            var allProjects = [];
            _.forOwn(this.campaigns, camp => {
               allProjects.push.apply(allProjects, camp.projects);
            });

            return allProjects;
        },

        selectedClientName: {
            get() {
                return this.clientNames[this.selected.client];
            },

            set(value) {
                this.selected.client = this.clientNames.indexOf(value);
            }
        },

        projectsSortType: {
            get() {
                return this.sortProjectsOptions[this.selected.sortProjects] || [];
            },

            set(value) {
                this.selected.sortProjects = this.sortProjectsOptions.indexOf(value);
            }
        },

        // status() {
        //     const selectedProjects = this.projects.filter(p => p.isChecked);
            
        //     //trace("projects?", this.projects);
            
        //     return selectedProjects.length==0 ? '' : selectedProjects.length + ' projects selected.';
        // }
    },

    methods: {
        ...Vuex.mapActions("*"),
        
        sortCampaigns(obj) {
            return _.keys(obj).map( key => _.extend({name: key}, obj[key]) );
        },

        sortProjects(arr) {
            if(arr.length>0 && !('isChecked' in arr[0])) {
                arr.forEach(a => a.isChecked = false);
            }

            return _.sortBy(arr, ['name']);
        },

        onProjectClicked(project) {
            trace(project);
        },

        onOpenLogos() {
            $$$.api('/api/projects/open-logo-folder')
                .then( data => {
                    trace('Open ok?', data);
                });
        },

        onAddProjectToCampaign(camp) {
            const projectNames = camp.projects.map(p => p.name).sort();
            const projectLastNumber = !projectNames.length ? -1 : parseInt(projectNames.pop().split('_')[0], 10);
            const projectNextNumber = String(projectLastNumber + 1).padStart('3', '0');
            
            $$$.prompt({
                    title: `Add <b>${camp.name}</b> Project`,
                    message: `What is the name of your new project?`,
                    answer: `${projectNextNumber}_PROJECTNAME`,
                })
                .then( proceed => trace("Proceed?", proceed) )
                // .then(answer => $$$.api('/api/projects/add-project', {campaign: _.omit(camp, 'projects'), projectName: answer } ) )
                // .then(data => {
                //     trace.OK('Added ok!');
                //     trace(data);
                // });
        },

        onAddCampaign() {
            const clientName = this.selectedClientName;
            const client = this.catalog[this.selectedClientName];
            //client
            const ask = $$$.prompt({
                    title: `Add New Campaign / Brand`,
                    message: `What is the name of your new campaign?`,
                });

            const ask2 = ask.then( ok => trace('OK...', ok));

            trace(ask, ask2);
                
        }
    },
    
    mounted() {

    }
}
</script>
