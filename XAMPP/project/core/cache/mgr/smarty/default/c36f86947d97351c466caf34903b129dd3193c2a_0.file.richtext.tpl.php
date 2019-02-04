<?php
/* Smarty version 3.1.33, created on 2019-02-04 16:28:02
  from 'C:\xampp\htdocs\project\manager\templates\default\element\tv\renders\input\richtext.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_5c585a02a59ba8_47467777',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c36f86947d97351c466caf34903b129dd3193c2a' => 
    array (
      0 => 'C:\\xampp\\htdocs\\project\\manager\\templates\\default\\element\\tv\\renders\\input\\richtext.tpl',
      1 => 1549264310,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c585a02a59ba8_47467777 (Smarty_Internal_Template $_smarty_tpl) {
?><textarea id="tv<?php echo $_smarty_tpl->tpl_vars['tv']->value->id;?>
" name="tv<?php echo $_smarty_tpl->tpl_vars['tv']->value->id;?>
" class="modx-richtext" onchange="MODx.fireResourceFormChange();"><?php echo htmlspecialchars($_smarty_tpl->tpl_vars['tv']->value->get('value'), ENT_QUOTES, 'UTF-8', true);?>
</textarea>

<?php echo '<script'; ?>
 type="text/javascript">

Ext.onReady(function() {
    
    MODx.makeDroppable(Ext.get('tv<?php echo $_smarty_tpl->tpl_vars['tv']->value->id;?>
'));
    
});
<?php echo '</script'; ?>
><?php }
}
