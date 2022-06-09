/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imageupload/imageuploadui
 */

import { Plugin, icons } from 'ckeditor5/src/core';
import { FileDialogButtonView } from 'ckeditor5/src/upload';
import { createImageTypeRegExp, createVideoTypeRegExp } from './utils';

/**
 * The image upload button plugin.
 *
 * For a detailed overview, check the {@glink features/image-upload/image-upload Image upload feature} documentation.
 *
 * Adds the `'uploadImage'` button to the {@link module:ui/componentfactory~ComponentFactory UI component factory}
 * and also the `imageUpload` button as an alias for backward compatibility.
 *
 * @extends module:core/plugin~Plugin
 */
export default class ImageUploadUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ImageUploadUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const componentCreator = locale => {
			const view = new FileDialogButtonView( locale );
			const command = editor.commands.get( 'uploadImage' );
			const imageTypes = editor.config.get( 'image.upload.types' );
			const videoTypes = editor.config.get( 'video.upload.types' );

			const imageTypesRegExp = createImageTypeRegExp( imageTypes );
			const videoTypesRegExp = createVideoTypeRegExp( videoTypes );

			view.set( {
				acceptedType:
					imageTypes.map( type => `image/${ type }` ).join( ',' ) +
					',' +
					videoTypes.map( type => `video/${ type }` ).join( ',' ) +
					',application/pdf',
				allowMultipleFiles: true
			} );

			view.buttonView.set( {
				label: t( 'Insert image' ),
				icon: icons.image,
				tooltip: true
			} );

			view.buttonView.bind( 'isEnabled' ).to( command );

			view.on( 'done', ( evt, files ) => {
				const imagesToUpload = Array.from( files ).filter( file => imageTypesRegExp.test( file.type ) );
				const videosToUpload = Array.from( files ).filter( file => videoTypesRegExp.test( file.type ) );
				const pdfsToUpload = Array.from( files ).filter( file => file.type === 'application/pdf' );

				if ( imagesToUpload.length ) {
					editor.execute( 'uploadImage', { file: imagesToUpload } );
				}
				if ( videosToUpload.length ) {
					editor.execute( 'uploadImage', { file: videosToUpload } );
				}
				if ( pdfsToUpload.length ) {
					editor.execute( 'uploadImage', { file: pdfsToUpload } );
				}
			} );

			return view;
		};

		// Setup `uploadImage` button and add `imageUpload` button as an alias for backward compatibility.
		editor.ui.componentFactory.add( 'uploadImage', componentCreator );
		editor.ui.componentFactory.add( 'imageUpload', componentCreator );
	}
}
