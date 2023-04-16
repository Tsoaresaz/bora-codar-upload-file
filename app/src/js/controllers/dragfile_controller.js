const dragFiles = selector => {

    try {
        
        if (selector) {
            const drag_el = document.querySelector(selector);

            if (!drag_el) {
                throw Error('Error: verifique se elemento drag passado está correto');
            }

            drag_el.addEventListener('dragover', (e) => drag_el.classList.add('c-drag-files--dragover'))
            drag_el.addEventListener('dragleave', (e) => drag_el.classList.remove('c-drag-files--dragover'))
    
        }
    } catch (error) {
        console.log(error.message);
    }


}

export default dragFiles;