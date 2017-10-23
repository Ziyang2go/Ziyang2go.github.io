        if (jQuery("a.navbar-brand span").length != 0) {
                jQuery("a.navbar-brand").replaceWith('<a href="http://freevi.com/" class="navbar-brand" style="display:inline">' +
                            '<img src="http://freevi.com/img/flightdeck-logo.png">' +
                        '</a><a href="/" class="navbar-brand">' +
                            '<span>Developer</span>' +
                        '</a>');
        }
