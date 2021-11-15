function parse(text){
	// No more XSS. Wait nvm Not Blockquote friendly
	//text = text.replace(/</g, "&lt'")
	//text = text.replace(/>/g, "&gt'")
	// Emails
	text = text.replace(/<(.*)>/g, "<a href='mailto:$1' target='_blank'>$1</a>")
	// Images
	text = text.replace(/!\[(.*)\]\((.*)\)/g, "<img src='$2' alt='$1' width='400px'>")
	// Links
	text = text.replace(/\[(.*)\]\((.*)\)/g, "<a href='$2' target='_blank'>$1</a>")
	// Headers
	text = text.replace(/###### (.*)/g, "<h6>$1</h6>")
	text = text.replace(/##### (.*)/g, "<h5>$1</h5>")
	text = text.replace(/#### (.*)/g, "<h4>$1</h4>")
	text = text.replace(/### (.*)/g, "<h3>$1</h3>")
	text = text.replace(/## (.*)/g, "<h2>$1</h2>")
	text = text.replace(/# (.*)/g, "<h1>$1</h1>")
	// Very important text
	text = text.replace(/\*\*\*(.*)\*\*\*/g, "<b><i>$1</i></b>")
	text = text.replace(/___(.*)___/g, "<b><i>$1</i></b>")
	text = text.replace(/__\*(.*)\*__/g, "<b><i>$1</i></b>")
	text = text.replace(/\*\*_(.*)_\*\*/g, "<b><i>$1</i></b>")
	// Bold
	text = text.replace(/\*\*(.*)\*\*/g, "<b>$1</b>")
	text = text.replace(/__(.*)__/g, "<b>$1</b>")
	// Italics
	//text = text.replace(/\*(.*)\*/g, "<i>$1</i>")
	//text = text.replace(/_(.*)_/g, "<i>$1</i>")
	//Blockquote
	text = text.replace(/> (.*)/g, "<blockquote>$1</blockquote>")
	// Lists are wip
	//Code
	text = text.replace(/```(.*)```/gms, "<pre class='multiline'><code>$1</code></pre>")
	text = text.replace(/`(.*)`/g, "<pre class='singleline'><code>$1</code></pre>")
	// Rules
	text = text.replace(/\-{4,}/g, "<hr>")
	text = text.replace(/_{4,}/g, "<hr>")
	return text
}

navbar = `
<nav>
	<a href="/" class="logo">
		<img src="https://chathere.cookiesnowowl.repl.co/favicon.jpg" style="height:50px" id="logoimage">
		<h1>&nbsp;DevNotHackerCorporations</h1>
	</a>
	<a href="/about.html" class="navbar__link">About Us</a>
	<a href="/projects.html" class="navbar__link">Our Projects</a>
	<a href="/staff.html" class="navbar__link">Our Members</a>
	<a href="/blog.html" class="navbar__link">Blog</a>
</nav>
`

document.body.innerHTML = navbar+document.body.innerHTML