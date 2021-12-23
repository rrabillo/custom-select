export default class CustomSelect {

    constructor(element) {
        this.elWrapper = element;
        this.elSelect = this.elWrapper.querySelector('select');
        this.elDropdown = document.createElement('div');
        this.elDropdown.classList.add('custom-select__dropdown');
        this.elLabel = document.createElement('div');
        this.elLabel.classList.add('custom-select__label');

        this.build();
        this.buildOptions();
        this.bindEvents();
    }

    bindEvents(){
        this.elSelect.addEventListener('custom-select:rebuild', this.buildOptions.bind(this));
        this.elWrapper.addEventListener('custom-select:rebuild', this.buildOptions.bind(this));
        this.elLabel.addEventListener('click', () => {
            this.elWrapper.classList.toggle('is-open');
        });
    }

    build() {
        this.elWrapper.appendChild(this.elLabel);

        this.elWrapper.appendChild(this.elDropdown);
        this.elDropdown.innerHTML = "<ul></ul>";
    }

    buildOptions(){
        let wrapper = this.elDropdown.querySelector('ul');
        wrapper.innerHTML = '';
        [...this.elSelect.options].map((item,n) => {
            let el = document.createElement('li');
            el.setAttribute('data-value', item.value);
            el.innerText = item.innerText;
            wrapper.appendChild(el);
            el.addEventListener('click', this.onClickOption.bind(this));
        });
        this.elItems = this.elDropdown.querySelectorAll('li');
        this.updateLabel(this.elSelect.value);
    }

    onClickOption(e){
        if(!e.currentTarget.classList.contains('is-selected')){
            [...this.elItems].map((item,n) =>{
                item.classList.remove('is-selected');
            });
            e.currentTarget.classList.add('is-selected');
            this.updateSelect(e.currentTarget.getAttribute('data-value'));
        }
    }

    updateSelect(value){
        this.elSelect.value = value;
        let event = new Event('change');
        this.elSelect.dispatchEvent(event);
        this.updateLabel(this.elSelect.querySelector('option:checked').innerText);
        this.elWrapper.classList.remove('is-open');;
    }

    updateLabel(text){
        this.elLabel.innerText = text;
    }


}
