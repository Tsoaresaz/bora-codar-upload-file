const fileUpload = () => {
    try {
        const upload_el = document.querySelector(`[data-file-upload]`);
        const progress_el = document.querySelector('[data-progress-bar]');
        const percent_el = document.querySelector('[data-percent-bar]');
        const filename_el = document.querySelector('[data-filename]');
        const filesize_el = document.querySelector('[data-file-size]');
        const uploading_box_el = document.querySelector('[data-uploading-box]');
        const uploading_message_el = document.querySelector('[data-uploading-message]');

        uploading_box_el.style.display = 'none';

        if (!upload_el || !progress_el || !percent_el || !filename_el || !filesize_el || !uploading_box_el || !uploading_message_el) {
            throw new Error('Erro: verifique se o elemento upload selecionado está correto');
        }

        upload(upload_el, progress_el, percent_el, filename_el, filesize_el, uploading_box_el, uploading_message_el);

    } catch (error) {
        console.error(error.message);
    }
}

const convertToByte = number => {
    return number.toLocaleString('pt-BR', { style: 'unit', unit: 'byte' });
}

const upload = (element, progressBar, percentBar, filename, filesize, uploadingBox, message) => {
    try {
        if (!element) {
            throw new Error('Erro: verifique se o elemento upload foi passado corretamente')
        }

        const reset = () => {
            uploadingBox.querySelector('.c-uploading__icon').classList.add('loading');
            uploadingBox.querySelector('.c-uploading__icon').classList.remove('complete');
            uploadingBox.querySelector('.c-uploading__progress').classList.add('loading');
            uploadingBox.querySelector('.c-uploading__progress').classList.remove('complete');
        }

        const changeClass = () => {
            uploadingBox.querySelector('.c-uploading__icon').classList.remove('loading');
            uploadingBox.querySelector('.c-uploading__icon').classList.add('complete');
            uploadingBox.querySelector('.c-uploading__progress').classList.remove('loading');
            uploadingBox.querySelector('.c-uploading__progress').classList.add('complete');
        }

        element.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files) {
                const file = files[0];
                if (file) {
                    const fileReader = new FileReader();

                    message.style.display = 'none';
                    uploadingBox.style.display = 'flex';

                    reset();

                    fileReader.onprogress = event => {
                        filename.textContent = file.name;
                        if (event.lengthComputable) {
                            const progress = ((event.loaded / event.total) * 100).toFixed(1);
                            progressBar.value = progress;
                            percentBar.textContent = `${progress}%`;
                            filesize.textContent = `${convertToByte(event.loaded)} / ${convertToByte(event.total)}`;


                            if (progress >= 100) {
                                changeClass();
                            }
                        }
                    }

                    fileReader.onload = () => {
                        fileReader.result;
                    }

                    fileReader.readAsText(file);
                    setTimeout(() => {
                    }, 2000)
                }
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

export default fileUpload;