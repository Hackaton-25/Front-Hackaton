import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useNavBarAdminStore = defineStore('navbarAdminStore', () => {
  const isMobile = ref(false)
  const open = ref(false)
  const isDropdownOpen = ref(false)

  const router = useRouter()
  const route = useRoute()

  //NavbarAdminMenu.vue



  const menuSections = ref([
    {
      title: 'Sistema',
      items: [
        { label: 'Painel', to:('/dashboard/')},
        { label: 'Itens', to:('/dashboard/itens')},
        { label: 'Coleções', to:('/dashboard/colecoes')},
        { label: 'Movimentações', to:('/dashboard/movimentacoes')},
        { label: 'Subtipos', to:('/dashboard/subtipo')},
      ]
    },
  ])

    function navigateTo(to) {
  open.value = false
  setTimeout(() => {
    router.push(to)
  }, 100)
}


  function isCurrent(path) {
    return route.path === path
  }

  //NavbarAdminUser.vue

  //NavbarDropdown.vue

    const dropdownSections = ref([
  {
    title: 'Usuário',
    items: [
      {
        label: 'Logout',
        event: 'logout'
      }
    ]
  },
  {
    title: 'Site',
    items: [
      {
        label: 'Voltar ao site',
        to: '/home' // modifique para o caminho correto do site
      }
    ]
  }
  ])

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  function openDropdown() {
    isDropdownOpen.value = true
  }

  function closeDropdown() {
    isDropdownOpen.value = false
  }

  //NavLateralAdmin.vue

  //NavLateralResponsive.vue

    function toggleMenu() {
    open.value = !open.value
  }

  function openMenu() {
    open.value = true
  }

  function closeMenu() {
    open.value = false
  }


  function checkIsMobile() {
    isMobile.value = window.innerWidth <= 1150
  }



  function initResizeListener() {
    onMounted(() => {
      checkIsMobile()
      window.addEventListener('resize', checkIsMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkIsMobile)
    })
  }

  return {
    isMobile,
    open,
    isDropdownOpen,
    menuSections,
    checkIsMobile,
    initResizeListener,
    toggleDropdown,
    openDropdown,
    closeDropdown,
    toggleMenu,
    openMenu,
    closeMenu,
    navigateTo,
    isCurrent,
    dropdownSections,
  }
})