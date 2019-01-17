<?php
/* Smarty version 3.1.33, created on 2019-01-17 18:33:07
  from 'C:\xampp\htdocs\project\setup\templates\footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_5c40bc53e2ade3_04951703',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7dca7cf25a0bcf7c180ae1d17b1d310befa82177' => 
    array (
      0 => 'C:\\xampp\\htdocs\\project\\setup\\templates\\footer.tpl',
      1 => 1543308732,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c40bc53e2ade3_04951703 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\xampp\\htdocs\\project\\core\\model\\smarty\\plugins\\modifier.replace.php','function'=>'smarty_modifier_replace',),));
?>
        </div>
        <!-- end content -->
        <div class="clear">&nbsp;</div>
    </div>
</div>

<!-- start footer -->
<div id="footer">
    <div id="footer-inner">
    <div class="container_12">
        <p><?php ob_start();
echo date('Y');
$_prefixVariable1 = ob_get_clean();
echo smarty_modifier_replace($_smarty_tpl->tpl_vars['_lang']->value['modx_footer1'],'[[+current_year]]',$_prefixVariable1);?>
</p>
        <p><?php echo $_smarty_tpl->tpl_vars['_lang']->value['modx_footer2'];?>
</p>
    </div>
    </div>
</div>

<div class="post_body">

</div>
<!-- end footer -->
</body>
</html><?php }
}
