export default [
	{name: 'Project', color: '#f80', desc: 'Create and Manage your projects and clients.', cb: onTopMenu},
	{name: 'Designer', color: '#c08', desc: 'Draw and Import assets into a project.', cb: onTopMenu},
	{name: 'Animator', color: '#0c8', desc: 'Bring your assets to life in a timeline interface.', cb: onTopMenu},
	{name: 'Invoices', color: '#08f', desc: 'Bill your clients and get paid!', cb: onTopMenu},
];

function onTopMenu(e) {
	trace("on top menu...");
	trace(e);
}