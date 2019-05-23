CKEDITOR.editorConfig = function( config ) {
	config.toolbar_Full = [
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'editing', items: [ 'Scayt' ] },
		{ name: 'alignment', items: ['JustifyLeft','JustifyCenter','JustifyRight','BidiLtr','BidiRtl']},
		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
		{ name: 'tools', items: [ 'Maximize' ] },
		{ name: 'document', items: [ 'Source' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
		{ name: 'styles', items: [ 'Styles', 'Format' ] },
		{ name: 'about', items: [ 'About' ] }
	];

	config.toolbar_Basic = [
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
		{ name: 'alignment', items: ['JustifyLeft','JustifyCenter','JustifyRight','BidiLtr','BidiRtl']},
		{ name: 'format', items: [ 'Image','Link', 'Unlink','Table' ] },
		{ name: 'document', items: [ 'Source' ] }
	];

	config.filebrowserBrowseUrl = "#/filemanager";
	config.filebrowserWindowHeight = 600;
	config.filebrowserWindowWidth = 700;
	config.contentsCss = 'css/style.css';

	config.extraPlugins = 'bidi,justify';

	config.toolbar = 'Basic';
};
