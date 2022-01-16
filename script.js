let menuItems = Array.from(document.querySelectorAll(".menu-items"))

let index = 0

menuItems[index].classList.add('active')
document.querySelector( menuItems[index].getAttribute("for-id") ).classList.add('active')

for(var item of menuItems){
	item.onclick = function(){
		menuItems[index].classList.remove('active')
		document.querySelector( menuItems[index].getAttribute("for-id") ).classList.remove('active')

		index = menuItems.indexOf(this)

		menuItems[index].classList.add('active')
		document.querySelector( menuItems[index].getAttribute("for-id") ).classList.add('active')
	}
}

function filter(form,tableid) {
	let inputs = form.children
	let childs = document.querySelector(tableid).children;

	for (let i=0; i < childs.length; i++) {
		let status = true;
		for (var item of inputs){
			let filter = item.value.toUpperCase();
			let cat = item.name
			let txtValue = childs[i].getAttribute(cat).toUpperCase();

			if (txtValue.includes(filter) && status == true) {
				childs[i].style.display = "";
			}
			else {
				childs[i].style.display = "none";
				status = false
			}
		}
	}
}
