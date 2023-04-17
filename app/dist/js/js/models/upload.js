const fileUploadModel = (element, progressBar, percentBar, filename, filesize, uploadingBox) => {
    try {
        if (!element) {
            throw new Error('Erro: verifique se o elemento upload foi passado corretamente')
        }

        element.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files) {
                const file = files[0];
                if (file) {
                    const fileReader = new FileReader();
                    
                    uploadingBox.style.display = 'flex';
                    
                    fileReader.onprogress = event => {
                        filename.textContent = file.name;
                        if (event.lengthComputable) {
                            const progress = (event.loaded / event.total) * 100;
                            progressBar.value = progress;
                            percentBar.textContent = `${progress.toFixed(1)}%`;
                            filesize.textContent = `${event.loaded} / ${event.total}`;

                            console.log('lengthComputable: ', event.lengthComputable);
                            console.log('loaded: ', event.loaded);
                            console.log('total: ', event.total);
                            console.log('progress: ', progress);
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

export default fileUploadModel;