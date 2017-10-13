var StorageManager = (function() {
	var store = window.localStorage || {};
	store.lang = store.lang || 'java';
	
	return {
		getStorage : function() {
			return store;
		}
	};
}());

var View = function() {
};

// retrieve the language class as specified in the class attribute of the list item
View.prototype.extractLanguage = function(li) {
	li = li || {};
	var classes = li.attr('class') || '';
	var selectedLang = classes.match(/java|csharp|nodejs|cpp|python/g);
	return selectedLang[0];
};

// change the displayed language to the specified one
View.prototype.activateLanguage = function(lang) {
	var store = StorageManager.getStorage();	
	store.lang = lang;

	// activate tab content
	$('div.tab-pane').removeClass('active');
	$('div.' + lang).addClass('active');
			
	// activate tab headers
	$('.nav-tabs').children().removeClass('active');
	$('li.' + lang).addClass('active');
};

View.prototype.getViewPortOffset = function(target) {
	return target.offset().top - $('body').scrollTop();
};

View.prototype.scrollTop = function(y) {
	$('body').scrollTop(y);
};

// refreshes the scroll spy cache
// it is needed in the cases when the DOM changes
View.prototype.refreshScroll = function() {
	$('[data-spy="scroll"]').each(function () {
		$(this).scrollspy('refresh');
	});
};

var Events = function(view) {
	if (!(this instanceof Events)) {
		return new Events(view);
	}

	this.changeLanguageHandler = function(event) {
		// preserve the relative scroll position in the current view
		var target = $(event.target);
		var offsetTopInView = view.getViewPortOffset(target);
		
		// change the currently displayed language
		var lang = view.extractLanguage(target.parent());
		view.activateLanguage(lang);
		
		// return the relative scroll position
		view.scrollTop(target.offset().top - offsetTopInView);
		view.refreshScroll();
	}
};

$(function(){
	prettyPrint();
	
	// register click events
	var view = new View();
	var events = Events(view);
	$('a[data-toggle="tab"]').click(events.changeLanguageHandler);
	
	// activate the preferred language choice
	var store = StorageManager.getStorage();
	view.activateLanguage(store.lang);
})