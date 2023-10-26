<template>
  <div>
    <div>
      <nav
        class="vas-menu"
        ref="sidebarmen"
        :class="sidebarClass"
        :style="{
          width: sidebarMenuWidth,
          position: position,
          [menuDirection]: isCollapsed ? `calc(-1*(${sidebarMenuWidth} + 2px))` : '0px',
          direction: rtl ? 'rtl' : 'ltr',
          paddingTop: paddingTop,
        }"
        style="overflow: hidden"
        @[mouseEnterEvent]="onEnter"
        @[mouseLeaveEvent]="onLeave"
      >
        <div>
          <div>
            <div @click="closeSidebar">
              <button class="close-button" :class="{ 'material-icons-outlined': true }" style="margin-top: 50px">navigate_before</button>
            </div>

            <div class="logo">
              <img src="../assets/logo.svg" alt="Logo" />
            </div>
            <div
              @[menuScrollEvent]="onMenuScroll"
              class="menu-wraper"
              :class="{
                miniCoolapseMenu: miniMenuRef,
                compeleteCoolapseMenu: isCollapsed,
              }"
              :style="{
                width: sidebarMenuWidth,
              }"
            ></div>
          </div>

          <slot name="header" />
          <template v-for="(item, index) in computedMenuList" :key="index">
            <MenuItem
              v-if="!item?.header && !item?.LineShow"
              :item="item"
              :depth="0"
              :smallMenu="smallMenu"
              :siblingsHaveIconProp="siblingsHaveIcon"
            />
            <HeaderItem v-else-if="item?.header && !miniMenuRef" :data="item" />
            <Menuline v-else-if="item?.LineShow" :data="item" />
          </template>
          <div class="vas-footer">
            <div class="footer-wrapper"></div>
            <slot name="footer" />
          </div>
        </div>
      </nav>
    </div>

    <Transition name="vas-fade">
      <div v-if="overLayer" class="vas-over-layer"></div>
    </Transition>
  </div>
</template>

<script>
import HeaderItem from '../components/HeaderItem.vue';
import MenuItem from '../components/MenuItem.vue';
import Menuline from '../components/Menuline.vue';
import { initAwsomeSideBar } from '../hooks/useAwseomeSideBar';
import { useClickOutSide, useAutoCollapse } from '../hooks/useClickOutSide';
import { initAwsomeRouter } from '../hooks/useAwsomeRouter';
import { ref, computed, watch } from 'vue';
import DxList from 'devextreme-vue/list';
import { employees } from '../data';

export default {
  data() {
    return {
      isCollapsed: false,
      siblingsHaveIcon: false,
      smallMenu: false,
    };
  },
  // name: 'vas-menu',
  props: {
    menu: {
      type: Array,
      required: true,
    },
    menuType: {
      type: String,
      default: 'simple',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    miniMenu: {
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 300,
    },
    width: {
      type: String,
      default: '250px',
    },
    widthMiniMenu: {
      type: String,
      default: '65px',
    },
    autoCollapse: {
      type: Number,
      default: null,
    },
    removeIconSpace: {
      type: Boolean,
      default: false,
    },
    closeOnClickOutSide: {
      type: Boolean,
      default: false,
    },
    overLayerOnOpen: {
      type: Boolean,
      default: false,
    },
    childrenOpenAnimation: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'fixed',
    },
    keepChildrenOpen: {
      type: Boolean,
      default: false,
    },
    ChildrenOpenActiveRoute: {
      type: Boolean,
      default: true,
    },
    checkButtonActive: {
      type: Boolean,
      default: true,
    },
    vueRouterEnabel: {
      type: Boolean,
      default: false,
    },
    BottomMiniMenuBtn: {
      type: Boolean,
      default: true,
    },
    paddingTop: {
      type: String,
      default: '0px',
    },
    dark: {
      type: Boolean,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
    closeOpenMenuOnHrefPush: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    'item-click'(item) {
      return !!item;
    },
    'update:collapsed'(collapsed) {
      return !!(typeof collapsed === 'boolean');
    },
    'update:miniMenu'(collapsed) {
      return !!(typeof collapsed === 'boolean');
    },
  },

  data: () => ({
    smallMenu: false,
    siblingsHaveIcon: false,
  }),

  components: {
    MenuItem,
    HeaderItem,
    Menuline,
    DxList,
  },

  data() {
    return {
      dataSource: employees,
    };
  },
  mounted() {
    this.checkSiblingsForIcon();
    // USAGE
    window.addEventListener(
      'hashchange',
      () => {
        this.updateCurrentRoute(window.location);
      },
      false
    );
  },

  watch: {
    async $route() {
      this.updateCurrentRoute(window.location);
    },
    miniMenuRef() {
      if (this.miniMenuRef) {
        this.updateMenuHover(true);
      }
    },
  },
  computed: {
    menuScrollEvent() {
      return this.miniMenuRef ? 'scroll' : null;
    },
    mouseEnterEvent() {
      return this.miniMenuRef ? 'mouseenter' : null;
    },
    mouseLeaveEvent() {
      return this.miniMenuRef ? 'mouseleave' : null;
    },
    computedMenuList() {
      return this.addIdToMenuItems(this.menu);
    },
    listContainerClass() {
      return {
        'shift-right': !this.isCollapsed,
        'shift-left': this.isCollapsed,
      };
    },
  },
  methods: {
    closeSidebar() {
      this.isCollapsed = true; // Sidebar'ı kapat
      this.shiftListContainer();
    },
    toggleSidebar() {
      this.$emit('update:collapsed', !this.isCollapsed); // collapsed özelliğini tersine çevir
    },
    onMenuScroll() {
      this.updateMenuScroll();
    },
    onEnter() {
      this.updateMenuHover(true);
    },
    onLeave() {
      this.updateMenuHover(false);
    },
    checkSiblingsForIcon() {
      if (!this.removeIconSpace && this.menuType == 'fully') return;
      for (var i = 0; i < this.menu.length; i++) {
        if (this.menu[i]?.icon) {
          this.siblingsHaveIcon = true;
          break;
        }
      }
    },
    toggleMiniCollapse() {
      const x = !this.miniMenuRef;
      this.updateminiMenu(x);
      this.$emit('update:miniMenu', x);
    },
    shiftListContainer() {
      // List container'ın sol tarafa kaydırılması
      const listContainer = document.querySelector('.list-container');
      if (listContainer) {
        listContainer.classList.toggle('shift-right', !this.isCollapsed);
        listContainer.classList.toggle('shift-left', this.isCollapsed);
      }
    },
  },
  setup(props, context) {
    const {
      getIsCollapsed: isCollapsed,
      getIsminiMenu: miniMenuRef,
      updateMenuScroll,
      updateMenuHover,
      updateminiMenu,
      menuDirection,
      updateIsCollapsed,
      addIdToMenuItems,
    } = initAwsomeSideBar(props, context);
    const { updateCurrentRoute } = initAwsomeRouter(props, context);

    const sidebarmen = ref(null);
    const overLayer = ref(props.overLayerOnOpen);

    const { removeSideBarListner, addSideBarListner } = useClickOutSide(
      sidebarmen,
      () => {
        updateIsCollapsed(!isCollapsed.value);
      },
      isCollapsed
    );
    if (props.closeOnClickOutSide) {
      addSideBarListner();
    }
    watch(
      () => isCollapsed.value,
      (currentCollapsed) => {
        context.emit('update:collapsed', currentCollapsed);
        if (props.overLayerOnOpen) {
          overLayer.value = !currentCollapsed;
        }
        if (props.closeOnClickOutSide) {
          currentCollapsed ? removeSideBarListner() : addSideBarListner();
        }
      }
    );
    watch(
      () => props.collapsed,
      (val) => {
        updateIsCollapsed(val);
      }
    );
    watch(
      () => props.closeOnClickOutSide,
      (val) => {
        val ? addSideBarListner() : removeSideBarListner();
      }
    );
    watch(
      () => props.miniMenu,
      (val) => {
        updateminiMenu(val);
      }
    );
    watch(
      () => props.overLayerOnOpen,
      (val) => {
        if (val) {
          overLayer.value = !isCollapsed.value;
        } else {
          overLayer.value = false;
        }
      }
    );
    const sidebarMenuWidth = computed(() => {
      return miniMenuRef.value ? props.widthMiniMenu : props.width;
    });

    const sidebarClass = computed(() => {
      const theme = props.dark ? 'dark' : 'white';
      return [
        `${theme}-theme`,
        props.rtl ? 'rtl' : 'ltr',
        //isCollapsed.value ? 'compelete-coolapse-menu' : '',
      ];
    });

    useAutoCollapse(props.autoCollapse, updateIsCollapsed);
    if (props.overLayerOnOpen) {
      overLayer.value = !isCollapsed.value;
    }
    return {
      sidebarMenuWidth,
      updateMenuScroll,
      sidebarClass,
      sidebarmen,
      updateCurrentRoute,
      updateMenuHover,
      overLayer,
      isCollapsed,
      updateminiMenu,
      miniMenuRef,
      menuDirection,
      addIdToMenuItems,
    };
  },
};
</script>

<style lang="scss">
@use '../scss/vue-awesome-sidebar.scss';
.logo {
  text-align: center;
  padding: 20px;
  margin-left: 30px;
}

.logo img {
  max-width: 100%;
  height: auto;
}
.close-button {
  font-size: 20px;
  line-height: 5.5;
  padding-right: 110px;
  cursor: pointer;
  background: none;
  border: none;
  color: #f5f0f0;
  position: absolute;
  right: -85px;
}

.list-container {
  min-height: 100px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 250px;
  bottom: 0;
  transition: transform 0.3s;

  &.shift-right {
    transform: translateX(20px);
  }

  &.shift-left {
    transform: translateX(-190px);
  }
  .navbar {
    height: 50px; /* Navbar yüksekliğini istediğiniz değere ayarlayın */
    background-color: #333; /* Arka plan rengini istediğiniz renkle değiştirin */
    color: #fff; /* Yazı rengini istediğiniz renkle değiştirin */
    text-align: center; /* Metni ortala */
    padding: 10px; /* İçeriği ayarlayın */
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 equal-width columns, adjust as needed */
    gap: 10px; /* Adjust the gap between grid items */
    margin-top: 20px; /* Add margin as needed */
  }

  .grid-item {
    background-color: #f0f0f0; /* Adjust the background color */
    padding: 10px;
    text-align: center;
  }
}
</style>
