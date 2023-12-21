//document.addEventListener("DOMContentLoaded", function () {
    // const orderManagementBtn = document.getElementById("orderManagementBtn");
    // const dashboardBtn = document.getElementById("dashboardBtn");

    // const orderManagementSection = document.getElementById("orderManagementDashboard");
    // const dashboardSection = document.getElementById("adminDashboard");

    // const usersButton = document.getElementById("usersButton");
    // const branchesButton = document.getElementById("branchesButton");
    // const productsButton = document.getElementById("productsButton");
    // const announcementsButton = document.getElementById("announcementsButton");

    // const userManagement = document.getElementById("userManagement");
    // const branchManagement = document.getElementById("branchManagement");
    // const productManagement = document.getElementById("productManagement");
    // const announcementManagement = document.getElementById("announcementManagement");

    // const userCount = document.getElementById("userCount");
    // const branchCount = document.getElementById("branchCount");
    // const productCount = document.getElementById("productCount");
    // const announcementCount = document.getElementById("announcementCount");

    // const ordersButton = document.getElementById("ordersButton");
    // const deliveriesButton = document.getElementById("deliveriesButton");
    // const receivedButton = document.getElementById("receivedButton");

    // const orderCount = document.getElementById("orderCount");
    // const deliveriesCount = document.getElementById("deliveriesCount");
    // const receivedCount = document.getElementById("receivedCount");

    // const orderManagement = document.getElementById("orderManagement");
    // const deliveryManagement = document.getElementById("deliveryManagement");
    // const receivedManagement = document.getElementById("receivedManagement");

    // orderManagementBtn.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     orderManagementSection.classList.remove("hidden");
    //     dashboardSection.classList.add("hidden");
    // });
    // dashboardBtn.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     orderManagementSection.classList.add("hidden");
    //     dashboardSection.classList.remove("hidden");
    // });

    // usersButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     usersButton.classList.add("active");
    //     branchesButton.classList.remove("active");
    //     productsButton.classList.remove("active");
    //     announcementsButton.classList.remove("active");

    //     userManagement.classList.remove("inactive");
    //     productManagement.classList.add("inactive");
    //     branchManagement.classList.add("inactive");
    //     announcementManagement.classList.add("inactive");

    //     userCount.classList.remove("inactive")
    //     branchCount.classList.add("inactive")
    //     productCount.classList.add("inactive")
    //     announcementCount.classList.add("inactive")
    // });

    // branchesButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     usersButton.classList.remove("active");
    //     branchesButton.classList.add("active");
    //     productsButton.classList.remove("active");
    //     announcementsButton.classList.remove("active");

    //     userManagement.classList.add("inactive")
    //     productManagement.classList.add("inactive")
    //     branchManagement.classList.remove("inactive")
    //     announcementManagement.classList.add("inactive")

    //     userCount.classList.add("inactive")
    //     branchCount.classList.remove("inactive")
    //     productCount.classList.add("inactive")
    //     announcementCount.classList.add("inactive")
    // });

    // productsButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     usersButton.classList.remove("active");
    //     branchesButton.classList.remove("active");
    //     productsButton.classList.add("active");
    //     announcementsButton.classList.remove("active");
        
    //     userManagement.classList.add("inactive")
    //     productManagement.classList.remove("inactive")
    //     branchManagement.classList.add("inactive")
    //     announcementManagement.classList.add("inactive")

    //     userCount.classList.add("inactive")
    //     branchCount.classList.add("inactive")
    //     productCount.classList.remove("inactive")
    //     announcementCount.classList.add("inactive")
    // });

    // announcementsButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     usersButton.classList.remove("active");
    //     branchesButton.classList.remove("active");
    //     productsButton.classList.remove("active");
    //     announcementsButton.classList.add("active");

    //     userManagement.classList.add("inactive")
    //     productManagement.classList.add("inactive")
    //     branchManagement.classList.add("inactive")
    //     announcementManagement.classList.remove("inactive")

    //     userCount.classList.add("inactive")
    //     branchCount.classList.add("inactive")
    //     productCount.classList.add("inactive")
    //     announcementCount.classList.remove("inactive")
    // });

    // ordersButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     ordersButton.classList.add("active");
    //     deliveriesButton.classList.remove("active");
    //     receivedButton.classList.remove("active");

    //     orderManagement.classList.remove("inactive");
    //     deliveryManagement.classList.add("inactive");
    //     receivedManagement.classList.add("inactive");

    //     orderCount.classList.remove("inactive")
    //     deliveriesCount.classList.add("inactive")
    //     receivedCount.classList.add("inactive")
    // });

    // deliveriesButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     ordersButton.classList.remove("active");
    //     deliveriesButton.classList.add("active");
    //     receivedButton.classList.remove("active");

    //     orderManagement.classList.add("inactive");
    //     deliveryManagement.classList.remove("inactive");
    //     receivedManagement.classList.add("inactive");

    //     orderCount.classList.add("inactive")
    //     deliveriesCount.classList.remove("inactive")
    //     receivedCount.classList.add("inactive")
    // });

    // receivedButton.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     ordersButton.classList.remove("active");
    //     deliveriesButton.classList.remove("active");
    //     receivedButton.classList.add("active");

    //     orderManagement.classList.add("inactive");
    //     deliveryManagement.classList.add("inactive");
    //     receivedManagement.classList.remove("inactive");

    //     orderCount.classList.add("inactive")
    //     deliveriesCount.classList.remove("inactive")
    //     receivedCount.classList.remove("inactive")
    // });





















    
    // const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    // allSideMenu.forEach(item=> {
    //     const li = item.parentElement;

    //     item.addEventListener('click', function () {
    //         allSideMenu.forEach(i=> {
    //             i.parentElement.classList.remove('active');
    //         })
    //         li.classList.add('active');
    //     })
    // });

    // // TOGGLE SIDEBAR
    // const menuBar = document.querySelector('#content nav .bx.bx-menu');
    // const sidebar = document.getElementById('sidebar');

    // menuBar.addEventListener('click', function () {
    //     sidebar.classList.toggle('hide');
    // })

    // const searchButton = document.querySelector('#content nav form .form-input button');
    // const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    // const searchForm = document.querySelector('#content nav form');

    // searchButton.addEventListener('click', function (e) {
    //     if(window.innerWidth < 576) {
    //         e.preventDefault();
    //         searchForm.classList.toggle('show');
    //         if(searchForm.classList.contains('show')) {
    //             searchButtonIcon.classList.replace('bx-search', 'bx-x');
    //         } else {
    //             searchButtonIcon.classList.replace('bx-x', 'bx-search');
    //         }
    //     }
    // })

    // if(window.innerWidth < 768) {
    //     sidebar.classList.add('hide');
    // } else if(window.innerWidth > 576) {
    //     searchButtonIcon.classList.replace('bx-x', 'bx-search');
    //     searchForm.classList.remove('show');
    // }

    // window.addEventListener('resize', function () {
    //     if(this.innerWidth > 576) {
    //         searchButtonIcon.classList.replace('bx-x', 'bx-search');
    //         searchForm.classList.remove('show');
    //     }
    // })

    // const switchMode = document.getElementById('switch-mode');

    // switchMode.addEventListener('change', function () {
    //     if(this.checked) {
    //         document.body.classList.add('dark');
    //     } else {
    //         document.body.classList.remove('dark');
    //     }
    // })
//});