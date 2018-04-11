/**
 * Created by Chamberlain on 4/10/2018.
 */
$$$.fx = {
	fadeIn(el) {
		$(el).show();
		TweenMax.to(el, 0.2, {alpha:1});
	},

	fadeOut(el) {
		TweenMax.to(el, 0.2, {alpha:0, onComplete() {
			$(el).hide();
		}});
	}
}