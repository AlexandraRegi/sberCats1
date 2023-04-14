const generateCard = (cat) => {
	return `<div class="${
		cat.favourite ? 'card like' : 'card'
	}" style="background-image: url(${cat.image || 'images/cat.jpg'})">
    <div class="cat-card-btns">
 <button class="cat-card-view" value=${cat.id}>Посмотреть</button>
<button class="cat-card-update" value=${cat.id}>Изменить</button>
<button class="cat-card-delete" value=${cat.id}>Удалить</button>
</div>
    <span>${cat.name}</span>
</div>`;
};