/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// eslint-disable-next-line ckeditor5-rules/no-relative-imports
import ImageUpload from '../../ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import HTMLEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import MentionUI from '@ckeditor/ckeditor5-mention/src/mentionui';
import MentionEditing from '@ckeditor/ckeditor5-mention/src/mentionediting';
import VideoToolbar from '@visao/ckeditor5-video/src/videotoolbar.js';
import Video from '@visao/ckeditor5-video/src/video.js';
import VideoUpload from '@visao/ckeditor5-video/src/videoupload.js';
import VideoResize from '@visao/ckeditor5-video/src/videoresize.js';
import VideoStyle from '@visao/ckeditor5-video/src/videostyle.js';
import VideoInsert from '@visao/ckeditor5-video/src/videoinsert.js';
import {
	Emoji,
	EmojiActivity,
	EmojiFlags,
	EmojiFood,
	EmojiNature,
	EmojiObjects,
	EmojiPeople,
	EmojiPlaces,
	EmojiSymbols
} from '@phudak/ckeditor5-emoji/src';
import '../theme/emoji.css';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Alignment,
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	TableColumnResize,
	TableCaption,
	TextTransformation,
	HTMLEmbed,
	Mention,
	MentionUI,
	MentionEditing,
	VideoToolbar,
	Video,
	VideoUpload,
	VideoResize,
	VideoStyle,
	VideoInsert,
	Emoji,
	EmojiPeople,
	EmojiNature,
	EmojiPlaces,
	EmojiFood,
	EmojiActivity,
	EmojiObjects,
	EmojiSymbols,
	EmojiFlags
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'blockQuote',
			'bulletedList',
			'numberedList',
			'insertTable',
			'|',
			'outdent',
			'indent',
			'alignment:center',
			'alignment:left',
			'alignment:right',
			'alignment:justify',
			'|',
			'emoji',
			'|',
			'htmlEmbed',
			'mediaEmbed',
			'|',
			'uploadImage'
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties',
			'toggleTableCaption'
		],
		// Configuration of the TableProperties plugin.
		tableProperties: {
			// ...
			defaultProperties: {
				width: '100%'
			}
		},

		// Configuration of the TableCellProperties plugin.
		tableCellProperties: {
			// ...
		}
	},
	htmlEmbed: { showPreviews: true },
	mediaEmbed: { previewsInData: true },
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en',
	video: {
		styles: [ 'alignLeft', 'alignCenter', 'alignRight' ],
		toolbar: [
			'videoStyle:alignLeft',
			'videoStyle:alignCenter',
			'videoStyle:alignRight'
		]
	}
};
