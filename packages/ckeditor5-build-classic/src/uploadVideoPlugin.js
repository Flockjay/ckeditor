import { Plugin } from '@ckeditor/ckeditor5-core'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import { FileDialogButtonView } from 'ckeditor5/src/upload';
import uploadVideoIcon from '../theme/uploadVideo.svg'

export default class UploadVideo extends Plugin {
  /**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'UploadVideo';
	}

  /**
	 * @inheritDoc
	 */
  init() {
    const editor = this.editor

    editor.ui.componentFactory.add('uploadVideo', locale => {
      const view = new ButtonView(locale)

      view.set({
        label: 'Upload Video',
        icon: uploadVideoIcon,
        tooltip: true,
      })
      

      return view
    })
  }
}