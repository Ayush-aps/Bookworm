document.addEventListener('DOMContentLoaded', function() {
    // Filter dropdown toggle
    const filterDropdownBtn = document.getElementById('filter-dropdown-btn');
    const filterDropdownContent = document.getElementById('filter-dropdown-content');
    
    filterDropdownBtn.addEventListener('click', function() {
      filterDropdownContent.classList.toggle('show');
      const icon = this.querySelector('i');
      icon.style.transform = filterDropdownContent.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.filter-dropdown')) {
        filterDropdownContent.classList.remove('show');
        filterDropdownBtn.querySelector('i').style.transform = 'rotate(0)';
      }
    });
    
    // Filter selection
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const text = this.textContent.trim();
        
        filterDropdownBtn.innerHTML = text + ' <i class="fa-solid fa-chevron-down"></i>';
        filterDropdownContent.classList.remove('show');
        filterDropdownBtn.querySelector('i').style.transform = 'rotate(0)';
        
        // Filter books
        filterBooks(value);
      });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-title');
    searchInput.addEventListener('input', function() {
      const searchText = this.value.toLowerCase();
      const books = document.querySelectorAll('.book-item');
      
      books.forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        if (title.includes(searchText)) {
          book.style.display = '';
        } else {
          book.style.display = 'none';
        }
      });
    });
    
    // Sort functionality
    const sortButtons = document.querySelectorAll('.sort-button');
    sortButtons.forEach(button => {
      button.addEventListener('click', function() {
        const sortType = this.getAttribute('data-sort');
        const icons = document.querySelectorAll('.sort-button i');
        
        // Reset all icons
        icons.forEach(icon => {
          icon.className = 'fa-solid fa-sort';
        });
        
        // Toggle sort direction
        let sortDirection = this.getAttribute('data-direction') === 'asc' ? 'desc' : 'asc';
        this.setAttribute('data-direction', sortDirection);
        
        // Update icon
        const icon = this.querySelector('i');
        icon.className = sortDirection === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
        
        // Sort books
        sortBooks(sortType, sortDirection);
      });
    });
    
    // Function to filter books
    function filterBooks(status) {
      const books = document.querySelectorAll('.book-item');
      
      books.forEach(book => {
        if (status === 'all' || book.getAttribute('data-status') === status) {
          book.style.display = '';
        } else {
          book.style.display = 'none';
        }
      });
    }
    
    // Function to sort books
    function sortBooks(sortType, direction) {
      const bookList = document.getElementById('book-list');
      const books = Array.from(bookList.querySelectorAll('.book-item'));
      
      books.sort((a, b) => {
        let valueA, valueB;
        
        if (sortType === 'title') {
          valueA = a.querySelector('.book-title').textContent;
          valueB = b.querySelector('.book-title').textContent;
        } else if (sortType === 'rating') {
          valueA = parseFloat(a.querySelector('.rating').textContent);
          valueB = parseFloat(b.querySelector('.rating').textContent);
        } else if (sortType === 'progress') {
          const progressA = a.querySelector('.progress-info div').textContent.split('/')[0].trim();
          const progressB = b.querySelector('.progress-info div').textContent.split('/')[0].trim();
          valueA = parseInt(progressA) || 0;
          valueB = parseInt(progressB) || 0;
        }
        
        if (direction === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      // Re-append sorted items
      books.forEach(book => {
        bookList.appendChild(book);
      });
    }
  });