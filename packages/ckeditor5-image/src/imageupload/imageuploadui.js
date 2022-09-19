/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/imageupload/imageuploadui
 */

import { Plugin } from 'ckeditor5/src/core';
import { FileDialogButtonView } from 'ckeditor5/src/upload';
import { createImageTypeRegExp, createVideoTypeRegExp } from './utils';
import { createFileTypeRegExp } from '../fileupload/utils';
import mediaUploadIcon from '../../theme/icons/upload-media.svg';

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
			const fileTypes = editor.config.get( 'file.upload.types' );
			const extraFileTypes = editor.config.get( 'extraFile.upload.types' );

			const imageTypesRegExp = createImageTypeRegExp( imageTypes );
			const videoTypesRegExp = createVideoTypeRegExp( videoTypes );
			const fileTypesRegExp = createFileTypeRegExp( fileTypes );

			view.set( {
				acceptedType:
					imageTypes.map( type => `${ type }` ).join( ',' ) +
					',' +
					videoTypes.map( type => `${ type }` ).join( ',' ) +
					',' +
					fileTypes.map( type => `${ type }` ).join( ',' ) +
					',' +
					extraFileTypes.map( type => `${ type }` ).join( ',' ),
				allowMultipleFiles: true
			} );

			view.buttonView.set( {
				label: t( 'Insert Media' ),
				icon: mediaUploadIcon,
				tooltip: true
			} );

			view.buttonView.bind( 'isEnabled' ).to( command );

			view.on( 'done', ( evt, files ) => {
				const imagesToUpload = Array.from( files ).filter( file => imageTypesRegExp.test( file.type ) );
				const videosToUpload = Array.from( files ).filter( file => {
					return videoTypesRegExp.test( file.type ) || file.name.includes( '.mkv' );
				} );
				const filesToUpload = Array.from( files ).filter( file => {
					return fileTypesRegExp.test( file.type );
				} );
				const extraFilesToUpload = Array.from( files ).filter( file => {
					return extraFileTypes.some( type => file.name.includes( type ) );
				} );

				if ( imagesToUpload.length ) {
					editor.execute( 'uploadImage', { file: imagesToUpload } );
				}
				if ( videosToUpload.length ) {
					editor.execute( 'uploadVideo', { file: videosToUpload } );
				}
				if ( filesToUpload.length ) {
					editor.execute( 'fileUpload', { file: filesToUpload } );
				}
				if ( extraFilesToUpload.length ) {
					editor.execute( 'fileUpload', { file: extraFilesToUpload } );
				}
			} );

			return view;
		};

		// Setup `uploadImage` button and add `imageUpload` button as an alias for backward compatibility.
		editor.ui.componentFactory.add( 'uploadImage', componentCreator );
		editor.ui.componentFactory.add( 'imageUpload', componentCreator );
	}
}
