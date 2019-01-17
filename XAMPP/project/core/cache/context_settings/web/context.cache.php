<?php  return array (
  'config' => 
  array (
  ),
  'aliasMap' => 
  array (
    'index' => 1,
    'about' => 2,
  ),
  'resourceMap' => 
  array (
    0 => 
    array (
      0 => 1,
      1 => 2,
    ),
  ),
  'webLinkMap' => 
  array (
  ),
  'eventMap' => 
  array (
    'OnBeforeDocFormSave' => 
    array (
      2 => '2',
    ),
    'OnBeforeEmptyTrash' => 
    array (
      2 => '2',
    ),
    'OnChunkFormPrerender' => 
    array (
      1 => '1',
    ),
    'OnDocFormPrerender' => 
    array (
      3 => '3',
      1 => '1',
      2 => '2',
      6 => '6',
    ),
    'OnDocFormRender' => 
    array (
      8 => '8',
      2 => '2',
    ),
    'OnDocFormSave' => 
    array (
      8 => '8',
    ),
    'OnFileCreateFormPrerender' => 
    array (
      1 => '1',
    ),
    'OnFileEditFormPrerender' => 
    array (
      1 => '1',
    ),
    'OnFileManagerUpload' => 
    array (
      4 => '4',
      3 => '3',
    ),
    'OnLoadWebDocument' => 
    array (
      8 => '8',
    ),
    'OnMODXInit' => 
    array (
      3 => '3',
      8 => '8',
    ),
    'OnPluginFormPrerender' => 
    array (
      1 => '1',
    ),
    'OnResourceBeforeSort' => 
    array (
      2 => '2',
    ),
    'OnResourceDuplicate' => 
    array (
      8 => '8',
    ),
    'OnRichTextBrowserInit' => 
    array (
      9 => '9',
    ),
    'OnRichTextEditorInit' => 
    array (
      9 => '9',
    ),
    'OnRichTextEditorRegister' => 
    array (
      1 => '1',
      9 => '9',
    ),
    'OnSnipFormPrerender' => 
    array (
      1 => '1',
    ),
    'OnTempFormPrerender' => 
    array (
      1 => '1',
    ),
    'OnTVInputPropertiesList' => 
    array (
      6 => '6',
      3 => '3',
    ),
    'OnTVInputRenderList' => 
    array (
      6 => '6',
      3 => '3',
    ),
    'OnTVOutputRenderList' => 
    array (
      6 => '6',
    ),
    'OnTVOutputRenderPropertiesList' => 
    array (
      6 => '6',
    ),
    'OnWebPagePrerender' => 
    array (
      7 => '7',
    ),
  ),
  'pluginCache' => 
  array (
    1 => 
    array (
      'id' => '1',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'Ace',
      'description' => 'Ace code editor plugin for MODx Revolution',
      'editor_type' => '0',
      'category' => '0',
      'cache_type' => '0',
      'plugincode' => '/**
 * Ace Source Editor Plugin
 *
 * Events: OnManagerPageBeforeRender, OnRichTextEditorRegister, OnSnipFormPrerender,
 * OnTempFormPrerender, OnChunkFormPrerender, OnPluginFormPrerender,
 * OnFileCreateFormPrerender, OnFileEditFormPrerender, OnDocFormPrerender
 *
 * @author Danil Kostin <danya.postfactum(at)gmail.com>
 *
 * @package ace
 *
 * @var array $scriptProperties
 * @var Ace $ace
 */
if ($modx->event->name == \'OnRichTextEditorRegister\') {
    $modx->event->output(\'Ace\');
    return;
}

if ($modx->getOption(\'which_element_editor\', null, \'Ace\') !== \'Ace\') {
    return;
}

$ace = $modx->getService(\'ace\', \'Ace\', $modx->getOption(\'ace.core_path\', null, $modx->getOption(\'core_path\').\'components/ace/\').\'model/ace/\');
$ace->initialize();

$extensionMap = array(
    \'tpl\'   => \'text/x-smarty\',
    \'htm\'   => \'text/html\',
    \'html\'  => \'text/html\',
    \'css\'   => \'text/css\',
    \'scss\'  => \'text/x-scss\',
    \'less\'  => \'text/x-less\',
    \'svg\'   => \'image/svg+xml\',
    \'xml\'   => \'application/xml\',
    \'xsl\'   => \'application/xml\',
    \'js\'    => \'application/javascript\',
    \'json\'  => \'application/json\',
    \'php\'   => \'application/x-php\',
    \'sql\'   => \'text/x-sql\',
    \'md\'    => \'text/x-markdown\',
    \'txt\'   => \'text/plain\',
    \'twig\'  => \'text/x-twig\'
);

// Define default mime for html elements(templates, chunks and html resources)
$html_elements_mime=$modx->getOption(\'ace.html_elements_mime\',null,false);
if(!$html_elements_mime){
    // this may deprecated in future because components may set ace.html_elements_mime option now
    switch (true) {
        case $modx->getOption(\'twiggy_class\'):
            $html_elements_mime = \'text/x-twig\';
            break;
        case $modx->getOption(\'pdotools_fenom_parser\'):
            $html_elements_mime = \'text/x-smarty\';
            break;
        default:
            $html_elements_mime = \'text/html\';
    }
}

// Defines wether we should highlight modx tags
$modxTags = false;
switch ($modx->event->name) {
    case \'OnSnipFormPrerender\':
        $field = \'modx-snippet-snippet\';
        $mimeType = \'application/x-php\';
        break;
    case \'OnTempFormPrerender\':
        $field = \'modx-template-content\';
        $modxTags = true;
        $mimeType = $html_elements_mime;
        break;
    case \'OnChunkFormPrerender\':
        $field = \'modx-chunk-snippet\';
        if ($modx->controller->chunk && $modx->controller->chunk->isStatic()) {
            $extension = pathinfo($modx->controller->chunk->name, PATHINFO_EXTENSION);
            if(!$extension||!isset($extensionMap[$extension])){
                $extension = pathinfo($modx->controller->chunk->getSourceFile(), PATHINFO_EXTENSION);
            }
            $mimeType = isset($extensionMap[$extension]) ? $extensionMap[$extension] : \'text/plain\';
        } else {
            $mimeType = $html_elements_mime;
        }
        $modxTags = true;
        break;
    case \'OnPluginFormPrerender\':
        $field = \'modx-plugin-plugincode\';
        $mimeType = \'application/x-php\';
        break;
    case \'OnFileCreateFormPrerender\':
        $field = \'modx-file-content\';
        $mimeType = \'text/plain\';
        break;
    case \'OnFileEditFormPrerender\':
        $field = \'modx-file-content\';
        $extension = pathinfo($scriptProperties[\'file\'], PATHINFO_EXTENSION);
        $mimeType = isset($extensionMap[$extension])
            ? $extensionMap[$extension]
            : \'text/plain\';
        $modxTags = $extension == \'tpl\';
        break;
    case \'OnDocFormPrerender\':
        if (!$modx->controller->resourceArray) {
            return;
        }
        $field = \'ta\';
        $mimeType = $modx->getObject(\'modContentType\', $modx->controller->resourceArray[\'content_type\'])->get(\'mime_type\');

        if($mimeType == \'text/html\')$mimeType = $html_elements_mime;

        if ($modx->getOption(\'use_editor\')){
            $richText = $modx->controller->resourceArray[\'richtext\'];
            $classKey = $modx->controller->resourceArray[\'class_key\'];
            if ($richText || in_array($classKey, array(\'modStaticResource\',\'modSymLink\',\'modWebLink\',\'modXMLRPCResource\'))) {
                $field = false;
            }
        }
        $modxTags = true;
        break;
    default:
        return;
}

$modxTags = (int) $modxTags;
$script = \'\';
if ($field) {
    $script .= "MODx.ux.Ace.replaceComponent(\'$field\', \'$mimeType\', $modxTags);";
}

if ($modx->event->name == \'OnDocFormPrerender\' && !$modx->getOption(\'use_editor\')) {
    $script .= "MODx.ux.Ace.replaceTextAreas(Ext.query(\'.modx-richtext\'));";
}

if ($script) {
    $modx->controller->addHtml(\'<script>Ext.onReady(function() {\' . $script . \'});</script>\');
}',
      'locked' => '0',
      'properties' => NULL,
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => 'ace/elements/plugins/ace.plugin.php',
    ),
    2 => 
    array (
      'id' => '2',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'Collections',
      'description' => '',
      'editor_type' => '0',
      'category' => '1',
      'cache_type' => '0',
      'plugincode' => '/**
 * Collections
 *
 * DESCRIPTION
 *
 * This plugin inject JS to handle proper working of close buttons in Resource\'s panel (OnDocFormPrerender)
 * This plugin handles setting proper show_in_tree parameter (OnBeforeDocFormSave, OnResourceSort)
 *
 * @var modX $modx
 * @var array $scriptProperties
 */
$corePath = $modx->getOption(\'collections.core_path\', null, $modx->getOption(\'core_path\', null, MODX_CORE_PATH) . \'components/collections/\');
/** @var Collections $collections */
$collections = $modx->getService(
    \'collections\',
    \'Collections\',
    $corePath . \'model/collections/\',
    array(
        \'core_path\' => $corePath
    )
);

$className = \'Collections\' . $modx->event->name;

$modx->loadClass(\'CollectionsPlugin\', $collections->getOption(\'modelPath\') . \'collections/events/\', true, true);
$modx->loadClass($className, $collections->getOption(\'modelPath\') . \'collections/events/\', true, true);

if (class_exists($className)) {
    /** @var CollectionsPlugin $handler */
    $handler = new $className($modx, $scriptProperties);
    $handler->run();
}

return;',
      'locked' => '0',
      'properties' => 'a:0:{}',
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
    3 => 
    array (
      'id' => '3',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'FastUploadTV',
      'description' => 'FastUploadTV 1.0.0-pl plugin for MODx Revolution',
      'editor_type' => '0',
      'category' => '0',
      'cache_type' => '0',
      'plugincode' => '$corePath = $modx->getOption(\'core_path\',null,MODX_CORE_PATH).\'components/fastuploadtv/\';
$assetsUrl = $modx->getOption(\'assets_url\',null,MODX_ASSETS_URL).\'components/fastuploadtv/\';

$modx->lexicon->load(\'fastuploadtv:default\');

switch ($modx->event->name) {
    case \'OnTVInputRenderList\':
        $modx->event->output($corePath.\'elements/tv/input/\');
        break;
    case \'OnTVInputPropertiesList\':
        $modx->event->output($corePath.\'elements/tv/input/options/\');
        break;
    case \'OnDocFormPrerender\':
        $js  = $modx->getOption(\'assets_url\').\'components/fastuploadtv/mgr/js/\';
        $modx->regClientStartupScript($js.\'widgets/modx.form.filefield.js\');
        $modx->regClientStartupScript($js.\'FastUploadTV.js\');
        $modx->regClientStartupScript($js.\'FastUploadTV.form.FastUploadTVField.js\');
        break;
    case \'OnMODXInit\':
        $mTypes = $modx->getOption(\'manipulatable_url_tv_output_types\',null,\'image,file\').\',fastuploadtv\';
        $modx->setOption(\'manipulatable_url_tv_output_types\', $mTypes);
        break;
    case \'OnFileManagerUpload\':
        if ((bool)$modx->getOption(\'fastuploadtv.translit\', null, false))
        {
            $fat = $modx->getOption(\'friendly_alias_translit\');
            $friendly_alias_translit = (empty($fat) || $fat == \'none\') ? false : true;
            
            foreach($files as $file)
            {
                if($file[\'error\'] == 0)
                {
                    $pathInfo = pathinfo($file[\'name\']);
                    $oldPath = $directory.$file[\'name\'];
                    
                    $filename = modResource::filterPathSegment($modx, $pathInfo[\'filename\']); // cleanAlias (translate)
                    if ($friendly_alias_translit)
                    {
                        $filename = preg_replace(\'/[^A-Za-z0-9_-]/\', \'\', $filename); // restrict segment to alphanumeric characters only
                    }
                    $filename = preg_replace(\'/-{2,}/\',\'-\',$filename); // remove double symbol "-"
                    $filename = trim($filename, \'-\'); // remove first symbol "-"
                    
                    $newPath = $filename . \'.\' . strtolower($pathInfo[\'extension\']);
                    
                    $source->renameObject($oldPath, $newPath);
                }
            }
        }
        break;
}',
      'locked' => '0',
      'properties' => NULL,
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
    4 => 
    array (
      'id' => '4',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'fileTranslit',
      'description' => 'This plugin transliterates file names automatically on upload.',
      'editor_type' => '0',
      'category' => '0',
      'cache_type' => '0',
      'plugincode' => '/**
 * @author Anton Andersen <anton.a.andersen@gmail.com>
 *
 * This plugin transliterates filenames on upload via MODX filemanager.
 * It should be bent to the OnFileManagerUpload event.
 * Project page: https://github.com/TriAnMan/filetranslit
 */
$currentdoc = $modx->newObject(\'modResource\');
foreach ($files as &$file) {
	if ($file[\'error\'] == 0) {
		$newName = $currentdoc->cleanAlias($file[\'name\']);

		//file rename logic
		if ($file[\'name\'] !== $newName) {
			$arDirFiles = $source->getObjectsInContainer($directory);
			foreach ($arDirFiles as &$dirFile){
				if($dirFile[\'name\']===$newName){
					//delete file if there is one with new name
					$source->removeObject($directory . $newName);
				}
			}
			//transliterate uploaded file
			$source->renameObject($directory . $file[\'name\'], $newName);
		}
	}
}',
      'locked' => '0',
      'properties' => NULL,
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
    6 => 
    array (
      'id' => '6',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'GalleryCustomTV',
      'description' => '',
      'editor_type' => '0',
      'category' => '0',
      'cache_type' => '0',
      'plugincode' => '/**
 * Handles plugin events for Gallery\'s Custom TV
 * 
 * @package gallery
 */
$corePath = $modx->getOption(\'gallery.core_path\',null,$modx->getOption(\'core_path\').\'components/gallery/\');
switch ($modx->event->name) {
    case \'OnTVInputRenderList\':
        $modx->event->output($corePath.\'elements/tv/input/\');
        break;
    case \'OnTVOutputRenderList\':
        $modx->event->output($corePath.\'elements/tv/output/\');
        break;
    case \'OnTVInputPropertiesList\':
        $modx->event->output($corePath.\'elements/tv/inputoptions/\');
        break;
    case \'OnTVOutputRenderPropertiesList\':
        $modx->event->output($corePath.\'elements/tv/properties/\');
        break;
    case \'OnManagerPageBeforeRender\':
        $gallery = $modx->getService(\'gallery\',\'Gallery\',$modx->getOption(\'gallery.core_path\',null,$modx->getOption(\'core_path\').\'components/gallery/\').\'model/gallery/\',$scriptProperties);
        if (!($gallery instanceof Gallery)) return \'\';

        $snippetIds = \'\';
        $gallerySnippet = $modx->getObject(\'modSnippet\',array(\'name\' => \'Gallery\'));
        if ($gallerySnippet) {
            $snippetIds .= \'GAL.snippetGallery = "\'.$gallerySnippet->get(\'id\').\'";\'."\\n";
        }
        $galleryItemSnippet = $modx->getObject(\'modSnippet\',array(\'name\' => \'GalleryItem\'));
        if ($galleryItemSnippet) {
            $snippetIds .= \'GAL.snippetGalleryItem = "\'.$galleryItemSnippet->get(\'id\').\'";\'."\\n";
        }

        $jsDir = $modx->getOption(\'gallery.assets_url\',null,$modx->getOption(\'assets_url\').\'components/gallery/\').\'js/mgr/\';
        $modx->controller->addLexiconTopic(\'gallery:default\');
        $modx->controller->addJavascript($jsDir.\'gallery.js\');
        $modx->controller->addJavascript($jsDir.\'tree.js\');
        $modx->controller->addHtml(\'<script type="text/javascript">
        Ext.onReady(function() {
            GAL.config.connector_url = "\'.$gallery->config[\'connectorUrl\'].\'";
            \'.$snippetIds.\'
        });
        </script>\');
        break;
    case \'OnDocFormPrerender\':
        $gallery = $modx->getService(\'gallery\',\'Gallery\',$modx->getOption(\'gallery.core_path\',null,$modx->getOption(\'core_path\').\'components/gallery/\').\'model/gallery/\',$scriptProperties);
        if (!($gallery instanceof Gallery)) return \'\';

        /* assign gallery lang to JS */
        $modx->controller->addLexiconTopic(\'gallery:tv\');

        /* @var modAction $action */
        $action = $modx->getObject(\'modAction\',array(
            \'namespace\' => \'gallery\',
            \'controller\' => \'index\',
        ));
        $modx->controller->addHtml(\'<script type="text/javascript">
        Ext.onReady(function() {
            GAL.config = {};
            GAL.config.connector_url = "\'.$gallery->config[\'connectorUrl\'].\'";
            GAL.action = "\'.($action ? $action->get(\'id\') : 0).\'";
        });
        </script>\');
        $modx->controller->addJavascript($gallery->config[\'assetsUrl\'].\'js/mgr/tv/Spotlight.js\');
        $modx->controller->addJavascript($gallery->config[\'assetsUrl\'].\'js/mgr/gallery.js\');
        $modx->controller->addJavascript($gallery->config[\'assetsUrl\'].\'js/mgr/widgets/album/album.items.view.js\');
        $modx->controller->addJavascript($gallery->config[\'assetsUrl\'].\'js/mgr/widgets/album/album.tree.js\');
        $modx->controller->addJavascript($gallery->config[\'assetsUrl\'].\'js/mgr/tv/gal.browser.js\');
        $modx->controller->addJavascript($gallery->config[\'assetsUrl\'].\'js/mgr/tv/galtv.js\');
        $modx->controller->addCss($gallery->config[\'cssUrl\'].\'mgr.css\');
        break;
}
return;',
      'locked' => '0',
      'properties' => NULL,
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
    7 => 
    array (
      'id' => '7',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'Image SEO alt and title tags',
      'description' => 'This is an example plugin.  List the events it attaches to in the PluginEvents.',
      'editor_type' => '0',
      'category' => '4',
      'cache_type' => '0',
      'plugincode' => '/**
 * @name Image SEO alt and title tags
 * @description This is an example plugin.  List the events it attaches to in the PluginEvents.
 * @PluginEvents OnWebPagePrerender
 */

// Your core_path will change depending on whether your code is running on your development environment
// or on a production environment (deployed via a Transport Package).  Make sure you follow the pattern
// outlined here. See https://github.com/craftsmancoding/repoman/wiki/Conventions for more info
$core_path = $modx->getOption(\'imageseo.core_path\', null, MODX_CORE_PATH.\'components/imageseo/\');
include_once $core_path .\'vendor/autoload.php\';

use Masterminds\\HTML5;

if($modx->resource->get(\'content_type\') == 1){ //only run on HTML doc types
	$containerConfig = $modx->getOption(\'imageseo.containers\');
	$containerConfig = $containerConfig ? $containerConfig : \'article, section, header, footer, aside\';

	$headerConfig = $modx->getOption(\'imageseo.headings\');
	$headerConfig = $headerConfig ? $headerConfig : \'h1,h2,h3,h4,h5,h6\';

	$containers = explode(\',\', $containerConfig);
	$headers = explode(\',\', $headerConfig);
	$output = &$modx->resource->_output; // get a reference to the output
	$html5 = new HTML5();
	@$dom = $html5->loadHTML($output);

	foreach ($dom->getElementsByTagName(\'img\') as $node) {
		//find parents matching container array
		if(!$node->getAttribute(\'alt\')){
			// we do not have alt text
			setAltText($node, $headers, $containers, $modx);
		}
		if(!$node->getAttribute(\'title\')){
			//we do not have title text, set it to the same as the alt text
			$node->setAttribute(\'title\', $node->getAttribute(\'alt\'));
		}
	}

	$output = $html5->saveHTML($dom);
}

function getParentNode($node, $types){
	$parent = $node->parentNode;
	if(in_array($parent->tagName, $types)){
		return $parent;
	} else {
		if($parent->tagName == \'body\'){
			return false;
		} else {
			return getParentNode($parent, $types);
		}
	}
}

function getHeadingNode($parent, $headers, $containers){
	$search = true;
	$index = 0;
	for($index = 0; $index < count($headers); $index++){
		$tmp = $parent->getElementsByTagName($headers[$index]);
		if($tmp->length > 0){
			//we have headings, return the first
			return $tmp->item(0);
		}
	}
	$nextParent = getParentNode($parent, $containers);
	if($nextParent){
		return getHeadingNode($nextParent, $headers, $containers);
	} else {
		// no more parents
		return false;
	}
}

function setAltText($node, $headers, $containers, $modx){
	$heading = getHeadingNode($node->parentNode, $headers, $containers);
	if($heading){
		//we\'ve found a heading, use it\'s value as image alt
		$node->setAttribute(\'alt\', $heading->nodeValue);
	} else {
		//use pagetitle
		$alt = $modx->resource->get(\'pagetitle\');
		$longtitle = $modx->resource->get(\'longtitle\');
		if($longtitle){
			$alt = $longtitle;
		}
		$node->setAttribute(\'alt\', $alt);
	}
}',
      'locked' => '0',
      'properties' => NULL,
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
    8 => 
    array (
      'id' => '8',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'seoPro',
      'description' => 'SEO optimizing plugin for MODx Revolution.',
      'editor_type' => '0',
      'category' => '5',
      'cache_type' => '0',
      'plugincode' => '/**
 * The base seoPro snippet.
 *
 * @package seopro
 */
$seoPro = $modx->getService(\'seopro\', \'seoPro\', $modx->getOption(\'seopro.core_path\', null, $modx->getOption(\'core_path\') . \'components/seopro/\') . \'model/seopro/\', $scriptProperties);
if (!($seoPro instanceof seoPro)) {
    return \'\';
}

$disabledTemplates = explode(\',\', $modx->getOption(\'seopro.disabledtemplates\', null, \'0\'));

switch ($modx->event->name) {
    case \'OnMODXInit\':
        $version = $modx->getVersionData();
        $version = (int)($version[\'version\'] . $version[\'major_version\']);
        if ($version < 27) {
            $modx->loadClass(\'modResource\');
            $modx->map[\'modResource\'][\'fieldMeta\'][\'description\'] = array(
                \'dbtype\' => \'text\',
                \'phptype\' => \'string\',
                \'index\' => \'fulltext\',
                \'indexgrp\' => \'content_ft_idx\',
            );
        }
        break;

    case \'OnDocFormRender\':
        $template = (string)$resource->get(\'template\');
        $override = false;
        if (isset($_REQUEST[\'template\'])) {
            $template = (string)$_REQUEST[\'template\'];
            $override = true;
        }
        if (($override && $template === \'0\') || (!empty($template) && in_array($template, $disabledTemplates))) {
            break;
        }
        
        $currClassKey = $resource->get(\'class_key\');
        $strFields = $modx->getOption(\'seopro.fields\', null, \'pagetitle:70,longtitle:70,description:320,alias:2023,menutitle:2023\');
        $arrFields = array();
        if (is_array(explode(\',\', $strFields))) {
            foreach (explode(\',\', $strFields) as $field) {
                list($fieldName, $fieldCount) = explode(\':\', $field);
                $arrFields[$fieldName] = $fieldCount;
            }
        } else {
            return \'\';
        }

        $keywords = \'\';
        $modx->controller->addLexiconTopic(\'seopro:default\');
        $ctxKey = !empty($resource) ? $resource->get(\'context_key\') : $modx->getOption(\'default_context\');
        $ctx = $modx->getContext($ctxKey);
        if ($ctx) {
            $url = $ctx->getOption(\'site_url\', \'\', $modx->getOption(\'site_url\'));
        } else {
            $url = $modx->getOption(\'site_url\');
        }
        if ($mode == \'upd\') {
            if ($ctx) {
                if ($resource->get(\'id\') != $ctx->getOption(\'site_start\', \'\', $modx->getOption(\'site_start\'))) {
                    $url .= $resource->get(\'uri\');
                }
            } else {
                $url = $modx->makeUrl($resource->get(\'id\'), \'\', \'\', \'full\');
            }
            $url = str_replace(
                $resource->get(\'alias\'),
                \'<span id=\\"seopro-replace-alias\\">\' . $resource->get(\'alias\') . \'</span>\',
                $url
            );
            $seoKeywords = $modx->getObject(\'seoKeywords\', array(\'resource\' => $resource->get(\'id\')));
            if ($seoKeywords) {
                $keywords = $seoKeywords->get(\'keywords\');
            }
        }

        if ($_REQUEST[\'id\'] == $modx->getOption(\'site_start\')) {
            unset($arrFields[\'alias\']);
            unset($arrFields[\'menutitle\']);
        }


        $config = $seoPro->config;
        unset($config[\'resource\']);
        $modx->regClientStartupHTMLBlock(\'<script type="text/javascript">
        Ext.onReady(function() {
            seoPro.config = \' . $modx->toJSON($config) . \';
            seoPro.config.record = "\' . $keywords . \'";
            seoPro.config.values = {};
            seoPro.config.fields = "\' . implode(",", array_keys($arrFields)) . \'";
            seoPro.config.chars = \' . $modx->toJSON($arrFields) . \'
            seoPro.config.url = "\' . $url . \'";
        });</script>\');

        /* include CSS and JS*/
        $version = $modx->getVersionData();
        if($version[\'version\'] == 2 && $version[\'major_version\'] == 2){
            $modx->regClientCSS($seoPro->config[\'assetsUrl\'] . \'css/mgr.css\');
        }else{
            $modx->regClientCSS($seoPro->config[\'assetsUrl\'] . \'css/mgr23.css\');
        }
        $modx->regClientStartupScript($seoPro->config[\'assetsUrl\'] . \'js/mgr/seopro.js??v=\' . $modx->getOption(\'seopro.version\', null, \'v1.0.0\'));
        $modx->regClientStartupScript($seoPro->config[\'assetsUrl\'] . \'js/mgr/resource.js?v=\' . $modx->getOption(\'seopro.version\', null, \'v1.0.0\'));

        break;

    case \'OnDocFormSave\':
        $template = (string)$resource->get(\'template\');
        $override = false;
        if (isset($_REQUEST[\'template\'])) {
            $template = (string)$_REQUEST[\'template\'];
            $override = true;
        }
        if (($override && $template === \'0\') || (!empty($template) && in_array($template, $disabledTemplates))) {
            break;
        }
        $seoKeywords = $modx->getObject(\'seoKeywords\', array(\'resource\' => $resource->get(\'id\')));
        if (!$seoKeywords && isset($resource)) {
            $seoKeywords = $modx->newObject(\'seoKeywords\', array(\'resource\' => $resource->get(\'id\')));
        }
        if($seoKeywords){
            if (isset($_POST[\'keywords\'])){
                $seoKeywords->set(\'keywords\', trim($_POST[\'keywords\'], \',\'));
            } else {
                $seoKeywords->set(\'keywords\', \'\');
            }
            $seoKeywords->save();
        }
        break;

    case \'onResourceDuplicate\':
        $template = (string)$resource->get(\'template\');
        $override = false;
        if (isset($_REQUEST[\'template\'])) {
            $template = (string)$_REQUEST[\'template\'];
            $override = true;
        }
        if (($override && $template === \'0\') || (!empty($template) && in_array($template, $disabledTemplates))) {
            break;
        }

        $seoKeywords = $modx->getObject(\'seoKeywords\', array(\'resource\' => $resource->get(\'id\')));
        if (!$seoKeywords) {
            $seoKeywords = $modx->newObject(\'seoKeywords\', array(\'resource\' => $resource->get(\'id\')));
        }
        $newSeoKeywords = $modx->newObject(\'seoKeywords\');
        $newSeoKeywords->fromArray($seoKeywords->toArray());
        $newSeoKeywords->set(\'resource\', $newResource->get(\'id\'));
        $newSeoKeywords->save();
        break;

    case \'OnLoadWebDocument\':
        if ($modx->context->get(\'key\') == "mgr") {
            break;
        }
        $template = ($modx->resource->get(\'template\')) ? (string)$modx->resource->get(\'template\') : \'\';
        if (in_array($template, $disabledTemplates)) {
            break;
        }
        $seoKeywords = $modx->getObject(\'seoKeywords\', array(\'resource\' => $modx->resource->get(\'id\')));
        if ($seoKeywords) {
            $keyWords = $seoKeywords->get(\'keywords\');
            $modx->setPlaceholder(\'seoPro.keywords\', $keyWords);
        }
        // Render the meta title, based on system settings
        $titleFormat = $modx->getOption(\'seopro.title_format\');
        if (empty($titleFormat)) {
            $siteDelimiter = $modx->getOption(\'seopro.delimiter\', null, \'/\');
            $siteUseSitename = (boolean)$modx->getOption(\'seopro.usesitename\', null, true);
            $siteID = $modx->resource->get(\'id\');
            $siteName = $modx->getOption(\'site_name\');
            $longtitle = $modx->resource->get(\'longtitle\');
            $pagetitle = $modx->resource->get(\'pagetitle\');
            $seoProTitle = array();
            if ($siteID == $modx->getOption(\'site_start\')) {
                $seoProTitle[\'pagetitle\'] = !empty($longtitle) ? $longtitle : $siteName;
            } else {
                $seoProTitle[\'pagetitle\'] = !empty($longtitle) ? $longtitle : $pagetitle;
                if ($siteUseSitename) {
                    $seoProTitle[\'delimiter\'] = $siteDelimiter;
                    $seoProTitle[\'sitename\'] = $siteName;
                }
            }
            $title = implode(\' \', $seoProTitle);
        } else {
            $title = $modx->getOption(\'seopro.title_format\');
        }
        $modx->setPlaceholder(\'seoPro.title\', $title);
        break;
}',
      'locked' => '0',
      'properties' => 'a:0:{}',
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
    9 => 
    array (
      'id' => '9',
      'source' => '0',
      'property_preprocess' => '0',
      'name' => 'TinyMCERTE',
      'description' => '',
      'editor_type' => '0',
      'category' => '6',
      'cache_type' => '0',
      'plugincode' => '/**
 * TinyMCE Rich Tech Editor
 *
 */
$corePath = $modx->getOption(\'tinymcerte.core_path\', null, $modx->getOption(\'core_path\', null, MODX_CORE_PATH) . \'components/tinymcerte/\');
/** @var TinyMCERTE $tinymcerte */
$tinymcerte = $modx->getService(
    \'tinymcerte\',
    \'TinyMCERTE\',
    $corePath . \'model/tinymcerte/\',
    array(
        \'core_path\' => $corePath
    )
);

$className = \'TinyMCERTE\' . $modx->event->name;
$modx->loadClass(\'TinyMCERTEPlugin\', $tinymcerte->getOption(\'modelPath\') . \'tinymcerte/events/\', true, true);
$modx->loadClass($className, $tinymcerte->getOption(\'modelPath\') . \'tinymcerte/events/\', true, true);
if (class_exists($className)) {
    /** @var TinyMCERTEPlugin $handler */
    $handler = new $className($modx, $scriptProperties);
    $handler->run();
}
return;',
      'locked' => '0',
      'properties' => 'a:0:{}',
      'disabled' => '0',
      'moduleguid' => '',
      'static' => '0',
      'static_file' => '',
    ),
  ),
  'policies' => 
  array (
    'modAccessContext' => 
    array (
      'web' => 
      array (
        0 => 
        array (
          'principal' => 0,
          'authority' => 9999,
          'policy' => 
          array (
            'load' => true,
          ),
        ),
        1 => 
        array (
          'principal' => 1,
          'authority' => 0,
          'policy' => 
          array (
            'about' => true,
            'access_permissions' => true,
            'actions' => true,
            'change_password' => true,
            'change_profile' => true,
            'charsets' => true,
            'class_map' => true,
            'components' => true,
            'content_types' => true,
            'countries' => true,
            'create' => true,
            'credits' => true,
            'customize_forms' => true,
            'dashboards' => true,
            'database' => true,
            'database_truncate' => true,
            'delete_category' => true,
            'delete_chunk' => true,
            'delete_context' => true,
            'delete_document' => true,
            'delete_eventlog' => true,
            'delete_plugin' => true,
            'delete_propertyset' => true,
            'delete_role' => true,
            'delete_snippet' => true,
            'delete_template' => true,
            'delete_tv' => true,
            'delete_user' => true,
            'directory_chmod' => true,
            'directory_create' => true,
            'directory_list' => true,
            'directory_remove' => true,
            'directory_update' => true,
            'edit_category' => true,
            'edit_chunk' => true,
            'edit_context' => true,
            'edit_document' => true,
            'edit_locked' => true,
            'edit_plugin' => true,
            'edit_propertyset' => true,
            'edit_role' => true,
            'edit_snippet' => true,
            'edit_template' => true,
            'edit_tv' => true,
            'edit_user' => true,
            'element_tree' => true,
            'empty_cache' => true,
            'error_log_erase' => true,
            'error_log_view' => true,
            'events' => true,
            'export_static' => true,
            'file_create' => true,
            'file_list' => true,
            'file_manager' => true,
            'file_remove' => true,
            'file_tree' => true,
            'file_update' => true,
            'file_upload' => true,
            'file_unpack' => true,
            'file_view' => true,
            'flush_sessions' => true,
            'frames' => true,
            'help' => true,
            'home' => true,
            'import_static' => true,
            'languages' => true,
            'lexicons' => true,
            'list' => true,
            'load' => true,
            'logout' => true,
            'logs' => true,
            'menus' => true,
            'menu_reports' => true,
            'menu_security' => true,
            'menu_site' => true,
            'menu_support' => true,
            'menu_system' => true,
            'menu_tools' => true,
            'menu_user' => true,
            'messages' => true,
            'namespaces' => true,
            'new_category' => true,
            'new_chunk' => true,
            'new_context' => true,
            'new_document' => true,
            'new_document_in_root' => true,
            'new_plugin' => true,
            'new_propertyset' => true,
            'new_role' => true,
            'new_snippet' => true,
            'new_static_resource' => true,
            'new_symlink' => true,
            'new_template' => true,
            'new_tv' => true,
            'new_user' => true,
            'new_weblink' => true,
            'packages' => true,
            'policy_delete' => true,
            'policy_edit' => true,
            'policy_new' => true,
            'policy_save' => true,
            'policy_template_delete' => true,
            'policy_template_edit' => true,
            'policy_template_new' => true,
            'policy_template_save' => true,
            'policy_template_view' => true,
            'policy_view' => true,
            'property_sets' => true,
            'providers' => true,
            'publish_document' => true,
            'purge_deleted' => true,
            'remove' => true,
            'remove_locks' => true,
            'resource_duplicate' => true,
            'resourcegroup_delete' => true,
            'resourcegroup_edit' => true,
            'resourcegroup_new' => true,
            'resourcegroup_resource_edit' => true,
            'resourcegroup_resource_list' => true,
            'resourcegroup_save' => true,
            'resourcegroup_view' => true,
            'resource_quick_create' => true,
            'resource_quick_update' => true,
            'resource_tree' => true,
            'save' => true,
            'save_category' => true,
            'save_chunk' => true,
            'save_context' => true,
            'save_document' => true,
            'save_plugin' => true,
            'save_propertyset' => true,
            'save_role' => true,
            'save_snippet' => true,
            'save_template' => true,
            'save_tv' => true,
            'save_user' => true,
            'search' => true,
            'set_sudo' => true,
            'settings' => true,
            'sources' => true,
            'source_delete' => true,
            'source_edit' => true,
            'source_save' => true,
            'source_view' => true,
            'steal_locks' => true,
            'tree_show_element_ids' => true,
            'tree_show_resource_ids' => true,
            'undelete_document' => true,
            'unlock_element_properties' => true,
            'unpublish_document' => true,
            'usergroup_delete' => true,
            'usergroup_edit' => true,
            'usergroup_new' => true,
            'usergroup_save' => true,
            'usergroup_user_edit' => true,
            'usergroup_user_list' => true,
            'usergroup_view' => true,
            'view' => true,
            'view_category' => true,
            'view_chunk' => true,
            'view_context' => true,
            'view_document' => true,
            'view_element' => true,
            'view_eventlog' => true,
            'view_offline' => true,
            'view_plugin' => true,
            'view_propertyset' => true,
            'view_role' => true,
            'view_snippet' => true,
            'view_sysinfo' => true,
            'view_template' => true,
            'view_tv' => true,
            'view_unpublished' => true,
            'view_user' => true,
            'workspaces' => true,
          ),
        ),
      ),
    ),
  ),
);