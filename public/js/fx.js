/**
 * Created by Chamberlain on 4/10/2018.
 */
$$$.fx = {
	fadeIn(el, isForced) {
		const $el = $(el);
		const $vue = $el[0].__vue__;
		if($vue) $vue.isVisible = true;

		$el.show();

		if(isForced) return TweenMax.fromTo($el, 0.2, {alpha:0}, {alpha:1});
		return TweenMax.to($el, 0.2, {alpha:1});
	},

	fadeOut(el) {
		const $el = $(el);
		const $vue = $el[0].__vue__;
		if($vue) $vue.isVisible = false;

		TweenMax.to(el, 0.2, {alpha:0, onComplete() {
			$(el).hide();
		}});
	}
}