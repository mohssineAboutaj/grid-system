/**
 * This file using to customize the documetation functionality
 */

/**
 * Init @highlightjs
 */
hljs.initHighlightingOnLoad();

/**
 * @sidebar visibility toggle
 */
let toggler = document.getElementById('sidebar-toggler'),
		sidebar = document.querySelector('aside'),
		sidebarChild = sidebar.querySelector('.sidebar'),
		links = sidebarChild.querySelectorAll('li a'),
		smValue = 576,
		hideClass = "hide",
		cookieName = "grid_system_sidebar_visibility";

// add bold active on click
let activeClass = "active";
links[0].classList.add(activeClass)
links.forEach((btn) => {
	btn.onclick = function() {
		for (let link of links) {
			link.classList.remove(activeClass)
		}
		this.classList.add(activeClass)
	}
})

// fix an issue in sidebarChild
sidebarChild.style.width = sidebar.clientWidth - 20 + "px";

// toggle sidebar when the click event
toggler.onclick = () => {
	sidebar.classList.toggle(hideClass)
	toggleSetCookie()
}

// toggle sidebar cookie value
function toggleSetCookie() {
	if (Cookies.get(cookieName) === "hide") {
		sidebarCookie("show")
	} else {
		sidebarCookie("hide")
	}
}

// toggle sidebar visibility based on the cookie value
function hideSidebarByCookieValue() {
	if (Cookies.get(cookieName) === "hide") {
		sidebar.classList.add(hideClass)
	} else {
		sidebar.classList.remove(hideClass)
	}
}

// hide sidebar if window size is small (sm)
function hideSidebar() {
	if (window.innerWidth <= smValue) {
		sidebar.classList.add(hideClass)
	} else {
		sidebar.classList.remove(hideClass)
	}
}

// general function to proccess the sidebar visibility
function sidebarToggleVisibility() {
	this.hideSidebar()
	this.hideSidebarByCookieValue()
}

window.onload = sidebarToggleVisibility
window.onresize = sidebarToggleVisibility

function sidebarCookie(value) {
	let cookieValue = value,
			cookieOptions = {
				// leave the cookie 30 days (1 month)
				expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),
			};

	Cookies.set(cookieName, cookieValue, cookieOptions)
}
