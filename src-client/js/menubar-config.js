/**
 * Created by Chamberlain on 5/26/2018.
 */

function app() {
	return $$$.vue.$app;
}

export default {
	PROJECT: [
		{name: 'New', click() { trace(app()) }},
		{name: 'Edit', click() { alert('edit') }},
		{name: 'Tools', children: [
			{name: 'Macro', children: [
				{name: 'Script1', click() { trace("Script 1")}},
				{name: 'Script2', click() { trace("Script 2")}}
			]},
			{name: 'Zoom +', click() { trace("Zoom +") }},
			{name: 'Zoom -', click() { trace("Zoom -") }},
		]}
	],
	DESIGNER: [
		{}
	],
	ANIMATOR: [
		{}
	],
	INVOICES: [
		{}
	]
};