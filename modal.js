const closeEditModal = () => {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-modal', 'false');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}
const showAddModal = () => {
    const modal = document.getElementById('addModal');
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    toggleSidebar()
  }
  const closeAddModal = () => {
    const modal = document.getElementById('addModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-modal', 'false');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('sidebar-closed');
    
    const isOpen = !sidebar.classList.contains('sidebar-closed');
    const toggle = document.querySelector('.sidebar-items');
    
    if (isOpen) {
        toggle.style.display = 'block' 
    } else {
        toggle.style.display = 'none'
    }
}


  
  