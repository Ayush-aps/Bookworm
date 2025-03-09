document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    const submenuToggles = document.querySelectorAll('.toggle-submenu');
    
    // Check for saved sidebar state
    const sidebarState = localStorage.getItem('sidebarCollapsed');
    if (sidebarState === 'true') {
      sidebar.classList.add('collapsed');
      updateMainContentMargin();
    }
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      
      // Save state to localStorage
      const isCollapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', isCollapsed);
      
      // Update main content margin
      updateMainContentMargin();
    });
    
    // Toggle submenus
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const parent = this.parentElement;
        const submenu = parent.querySelector('.submenu');
        
        // Toggle active class on parent
        parent.classList.toggle('active');
        
        // Toggle open class on submenu
        submenu.classList.toggle('open');
      });
    });
    
    // Function to update main content margin based on sidebar state
    function updateMainContentMargin() {
      const sidebarWidth = sidebar.classList.contains('collapsed') 
        ? getComputedStyle(document.documentElement).getPropertyValue('--sidebar-collapsed-width')
        : getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width');
        
      mainContent.style.marginLeft = sidebarWidth;
    }
    
    // Initial main content margin setup
    updateMainContentMargin();
    
    // Handle responsive behavior
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-active');
      });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && !sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
        sidebar.classList.remove('mobile-active');
      }
    });
    
    // Update on window resize
    window.addEventListener('resize', function() {
      updateMainContentMargin();
    });
  });