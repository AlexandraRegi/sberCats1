let store = window.localStorage;

const refreshCatsAndContent = () => {
	const content = document.getElementsByClassName('content')[0];
	content.innerHTML = '';

	api.getAllCats().then((res) => {
		store.setItem('cats', JSON.stringify(res));
		const cards = res.reduce((acc, el) => (acc += generateCard(el)), '');
		content.insertAdjacentHTML('afterbegin', cards);

		let cards2 = document.getElementsByClassName('card');
		for (let i = 0, cnt = cards2.length; i < cnt; i++) {
			const width = cards2[i].offsetWidth;
			cards2[i].style.height = width * 0.6 + 'px';
		}
	});
};

const openCatCardPopup = (cat) => {
	const content = document.getElementsByClassName('content')[0];
	content.insertAdjacentHTML('afterbegin', generateCatCardPopup(cat));
    console.log(cat);

	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopup = document.querySelector('.popup-close-cat-card');
	closeCatPopup.addEventListener('click', () => {
		catPopup.remove();
	});
};

const openUpdateCatCard = (cat) => {
	const content = document.getElementsByClassName('content')[0];
	content.insertAdjacentHTML('afterbegin', generateUpdateCatCard(cat));
	let catPopup = document.querySelector('.popup-wrapper-cat-card-update');
	let closeCatPopup = document.querySelector('.popup-close-cat-card-update');
	closeCatPopup.addEventListener('click', () => {
		catPopup.remove();
	});
    console.log(cat);
    const updateForm = document.forms.update;
    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const body = Object.fromEntries(formData.entries());
        api.updateCat({...body, id: cat.id}).then(() => {
            refreshCatsAndContent();
        });
        
    })
};

const refreshCatsAndContentSync = () => {
	const content = document.getElementsByClassName('content')[0];
	content.innerHTML = '';

	const cards = JSON.parse(store.getItem('cats')).reduce(
		(acc, el) => (acc += generateCard(el)),
		''
	);
	content.insertAdjacentHTML('afterbegin', cards);

	let cards2 = document.getElementsByClassName('card');
	for (let i = 0, cnt = cards2.length; i < cnt; i++) {
		const width = cards2[i].offsetWidth;
		cards2[i].style.height = width * 0.6 + 'px';
	}
};

const addCatInLocalStorage = (cat) => {
	store.setItem(
		'cats',
		JSON.stringify([...JSON.parse(store.getItem('cats')), cat])
	);
};

const deleteCatFromLocalStorage = (catId) => {
	store.setItem(
		'cats',
		JSON.stringify(
			JSON.parse(store.getItem('cats')).filter((el) => el.id != catId)
		)
	);
};

const getNewIdOfCatSync = () => {
	let res = JSON.parse(store.getItem('cats'));
	if (res.length) {
		return Math.max(...res.map((el) => el.id)) + 1;
	} else {
		return 1;
	}
};

const getNewIdOfCat = () => {
	return api.getIdsOfCat().then((res) => {
		if (res.length) {
			return Math.max(...res) + 1;
		} else {
			return 1;
		}
	});
};

refreshCatsAndContent();

const updateForm = document.forms.update;

document
    .getElementsByClassName('content')[0]
	.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			if (event.target.className === 'cat-card-view') {
				api.getCatById(event.target.value).then((res) => {
					openCatCardPopup(res);
				});
			} else if (event.target.className === 'cat-card-update') {
                api.getCatById(event.target.value).then((res) => {
					openUpdateCatCard(res);
				});
                
			} else if (event.target.className === 'cat-card-delete') {
				api.deleteCat(event.target.value).then((res) => {
					deleteCatFromLocalStorage(event.target.value);
					refreshCatsAndContentSync();
				});
			}
		}
	});

document.forms[0].addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	const body = Object.fromEntries(formData.entries());

	api.addCat({ ...body, id: getNewIdOfCatSync() }).then(() => {
		addCatInLocalStorage({ ...body, id: getNewIdOfCatSync() });
		refreshCatsAndContentSync();
	});
})

document
	.getElementById('reload-page')
	.addEventListener('click', refreshCatsAndContent);

let addBtn = document.querySelector('#add');
let popupForm = document.querySelector('#popup-form');
let closePopupForm = popupForm.querySelector('.popup-close');


addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (!popupForm.classList.contains('active')) {
		popupForm.classList.add('active');
		popupForm.parentElement.classList.add('active');
	}
});

closePopupForm.addEventListener('click', () => {
	popupForm.classList.remove('active');
	popupForm.parentElement.classList.remove('active');
});
