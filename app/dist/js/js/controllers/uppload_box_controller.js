const uploadBoxController = (selector, selectorMessage, visible = false) => {

    try {
        const uploadBox_el = document.querySelector(`[${selector}]`);
        const uploadBoxMessage_el = document.querySelector(`[${selectorMessage}]`);

        if (!uploadBox_el || !uploadBoxMessage_el) {
            throw new Error('Erro: verifique se o seletor box informado corretamente');
        }

        const showOrHiddenUploadingBox = (upload, message, visible) => {
            visible ? upload.classList.remove('hidden') : upload.classList.add('hidden');
            visible ? message.classList.add('hidden') : message.classList.remove('hidden');
        }
        //showOrHiddenUploadingBox(uploadBox_el, uploadBoxMessage_el, visible);

    } catch (error) {
        console.log(error.message);
    }
}

export default uploadBoxController;