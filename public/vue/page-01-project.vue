<template>
 <div class="page page-project fullsize">
  <!-- Left Nav -->
  <outer class="left-pane">
    <h2>Brands</h2>
   <hr/>
  </outer>

  <!-- Right (main) Nav -->
  <outer class="right-pane project-bg" :style="$app.getMenuCSS()">
   <Recents label="Brands" field="brand" :source="recentBrands"></Recents>

   <div v-if="brand">
    <p>Name of the brand: <b>"{{brand}}"</b></p>

    <Recents label="Campaigns" field="campaign" :source="recentCampaigns"></Recents>
   </div>

   <div v-if="campaign">
    <p>Name of the campaign: <b>"{{campaign}}"</b></p>

    <Recents label="Ads" field="ad" :source="recentAds"></Recents>

   </div>

   <div v-if="ad">
    <p>Name of the ad: <b>"{{ad}}"</b></p>
   </div>

   <div v-if="campaign">
     <h3>Launch in:</h3>
    <div class="grid-50-50 launcher-box">
     <goto v-for="(menu, i) in menusExceptProject"
           class="friendly-box"
           :style="$app.getMenuCSS(menu)"
           :to="{name: menu.name.toLowerCase()}">
       <icon :name="menu.icon"></icon> {{menu.name}}
     </goto>
    </div>
    </i>
   </div>

  </outer>
 </div>
</template>

<script>

const Recents = {
	props: ['field', 'source', 'label'],

	methods: {
		convertToObj(item) {
			var obj = {};
			obj[this.field] = item;
			return obj;
        },

    },

	template: `<div>Recent {{label}}:
          <ul>
           <li v-for="(item, i) in source">
            <goto :to="convertToObj(item)">{{item}}</goto>
           </li>
          </ul>
      </div>`,
};

export default {
    data: () => ({
		recentBrands: 'starbucks,tim horton,second cup'.split(','),
		recentCampaigns: 'coffee,frozen drink,juice'.split(','),
		recentAds: 'test1,test2,test3'.split(',')
    }),

    computed: {
    	menusExceptProject() {
    		return this.$app.topmenus.filter(m => m.name!=='Project');
		}
    },

    components: { Recents }
}

</script>