import { Plugin } from '@ckeditor/ckeditor5-core'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import slidesIcon from '../theme/slides.svg'

export default class EmbedSlides extends Plugin {
  /**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'EmbedSlides';
	}

  /**
	 * @inheritDoc
	 */
  init() {
    const editor = this.editor

    editor.ui.componentFactory.add('embedSlides', locale => {
      const view = new ButtonView(locale)

      view.set({
        label: 'Embed Slides',
        icon: slidesIcon,
        tooltip: true,
      })
      

      return view
    })
  }
}