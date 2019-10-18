$(function () {

    // const burger = document.querySelector('.burger');
    // burger.addEventListener('click', () => {
    //     burger.classList.toggle('burger-active');
    // });


	//m-menu
	$('.burger').on('click', function (e) {
		e.preventDefault();
		//$('.m-menu-box').toggleClass('show');
		$('.burger-line').toggleClass('burger-active');
    });
    



});