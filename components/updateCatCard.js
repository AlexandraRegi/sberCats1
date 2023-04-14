const generateUpdateCatCard = (cat) => {
	return `<div class="popup-wrapper-cat-card-update active">
        <div class="popup-cat-card-update active">
        <div class="popup-close-cat-card-update btn"><i class="fa-solid fa-xmark"></i></div>
        <h2>Изменить котика</h2>
        <form id="update" action="">
            <div id=image1 class="" style="background-image: url(${
cat.image || 'images/cat.jpg'
})"" ></div>
            <input type="number" name="age" placeholder="Возраст" value=${cat.age} />
            <input type="text" name="name" required placeholder="Имя" value=${cat.name} />
            <input
                type="number"
                name="rate"
                placeholder="Рейтинг (0-10)"
                min="0"
                max="10"
                value=${cat.rate}
            />
            <textarea name="description" placeholder="Описание" value=${cat.description}></textarea>
            <label
                >Любимчик <input type="checkbox" name="favourite" placeholder="" value=${cat.favourite}
            /></label>
            <input type="text" name="image" placeholder="Ссылка на фото" />
            <button type="submit" id="pushEdit">Изменить котика</button>
        </form>
        </div>
    </div>`;
};