// Clever stackoverflow stuff
function getTimezoneName() {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    
    // by this time `trimmed` should be the timezone's name with some punctuation -
    // trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full;
  }
}

function getposts(){
	posts = []
	err = false
	done = false
	let rd = fetch("/blog/posts.json").then(rd=>rd.json()).then(raw_data=>{
		document.getElementById("bpost__listofposts").style.color = "lightgreen"
		document.getElementById("bpost__listofposts").innerHTML = "Success"
		let count = 0
		raw_data.forEach(function(e){
			fetch("/blog/"+e).then(e=>e.text() ).then(post=>{
				count += 1
				let x = count.toString() + "/"+raw_data.length.toString()
				if (x === null){
					x = "ERROR"
					document.getElementById("bpost__fpost").style.color = "pink"
				}else{
					document.getElementById("bpost__fpost").style.color = "gold"
				}
				document.getElementById("bpost__fpost").innerHTML = x
				post = parse(post)
				let poster = post.split("\n")[1]
				let blogname = post.split("\n")[0]
				let pt = post.split("\n")[2]
				let posttime = new Date(parseInt(pt))
				let timestring = (posttime.getMonth()+1)+"/"+posttime.getDate()+"/"+posttime.getFullYear()+" "+(posttime.getHours()%12)+":"+(posttime.getMinutes() < 10 ? "0":"")+posttime.getMinutes()+(posttime.getHours()%12 === posttime.getHours ? "AM":"PM")
				posts.push([parseInt(pt), `
				<div class="post">
					<h1>${blogname}</h1>
					<h2>By ${poster}, ${timestring}</h2>
					<div class="message">${post.split("\n").slice(3).join("\n").replace(/\n/g, "<br>").replace(" ", "&nbsp;")}</div>
				</div>`])
				if (count === raw_data.length){
					document.getElementById("bpost__fpost").style.color = "lightgreen"
					done = true
				}
			})
		})
	}).catch(e=>{document.getElementById("bpost__listofposts").innerHTML = "Failed";document.getElementById("bpost__listofposts").style.color='pink';done=false})
}
const loc = Intl.DateTimeFormat().resolvedOptions().timeZone
const timezonename = getTimezoneName()
const apprev = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]
document.getElementById("timezone").innerHTML = `${timezonename} (${loc} ${apprev})`
getposts()
i = setInterval(()=>{
	if (done){
		posts.sort(function(x, y){
			return y[0] - x[0]
		})
		document.getElementById("bpost").innerHTML = ""
		posts.forEach((x)=>{
			document.getElementById("bpost").innerHTML += x[1]
		})
		clearInterval(i)
	}
}, 100)