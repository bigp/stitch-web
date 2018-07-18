<template>
    <li :class="'menu-item ' + classNames" @mouseover="onMouseOver()">
        <i class="menu-label" @mousedown="onMouseDown()"
           @mouseup="onMouseUp()">
            <icon v-if="item.icon" :name="item.icon"></icon>
            <i>{{item.name}}</i>
        </i>


        <ul :class="'submenu submenu-depth-' + (depth+1)"
            v-show="canExpand && isOpened">
            <menu-item v-for="(kid, i) in item.children"
                       :depth="depth + 1"
                       :item="kid"
                       :key="i"
            ></menu-item>
        </ul>
    </li>
</template>

<script>

    let isOutside = true;
    const EVENT_COLLAPSE_ALL = 'menu:collapseAll';

	$(document).mouseup((e) => {
		if(!isOutside) return;

		$$$.emit(EVENT_COLLAPSE_ALL);
	});

	export default {
		props: {
			'item': {required:true},
			'depth': {default: 0}
		},

        data() {
			return {
				isOpened: false,
            }
        },

		computed: {
			classNames() {
				const lowname = !this.item || !this.item.name ? 'n-a' : this.item.name.toLowerCase();
				return 'menu-' + lowname + ' menu-depth-' + this.depth;
            },
			canExpand() {
				return this.item.children && this.item.children.length>0;
			},

            siblings() {
				const parent = this.$parent.item;
				if(parent && parent.children) {
					return parent.children.filter(f => f!==this.item);
                }

                return [];
            }
		},

		methods: {
			onMouseUp() {
				_.defer(() => isOutside = true );
            },

			onMouseOver() {
				this.siblings.forEach(s => s.$vue.isOpened = false);
				const kids = this.item.children;

				//if(kids) kids.forEach(k => k.$vue.isOpened = false);
				if(this.canExpand && this.depth>0) this.isOpened = true;
			},

			onMouseDown() {
				isOutside = false;

				if(this.canExpand) {
					this.isOpened = !this.isOpened;

					if(!this.isOpened && this.depth===0) {
						$$$.emit(EVENT_COLLAPSE_ALL);
                    }

                    return;
				}

				if(this.item.click) this.item.click();

				$$$.emit(EVENT_COLLAPSE_ALL);
			},
		},

        created() {
			this.item.$vue = this;

			const closeFunc = () => this.isOpened = false;

			$$$.on(EVENT_COLLAPSE_ALL, closeFunc);

			this.$once('hook:destroyed', () => {
				$$$.off(EVENT_COLLAPSE_ALL, closeFunc);
            });
        }
	}

</script>