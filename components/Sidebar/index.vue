<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
const open = ref(true);
const name = "Akinz-bobo";

const userStore = useUserStore();
const logout = () => {
  userStore.logout();
  navigateTo("/auth/login", { replace: true });
};
</script>

<template>
  <div>
    <div
      class="z-50 flex items-center justify-between w-full h-full p-4 md:hidden"
    >
      <Logo />
      <Icon
        class="z-50 cursor-pointer left-2 top-2"
        size="30"
        name="iconamoon:menu-burger-horizontal"
        @click="open = true"
      />
      <div
        v-if="open"
        class="fixed bg-white top-0 left-0 z-[999] w-full h-screen transition duration-200"
      >
        <Icon
          class="absolute z-50 cursor-pointer right-4 top-4"
          size="30"
          name="material-symbols:close"
          @click="open = false"
        />
        <SidebarMenu />
      </div>
    </div>
    <div
      class="hidden lg:flex w-[250px] h-screen md:flex flex-col justify-between border-r"
    >
      <SidebarMenu />

      <Popover>
        <PopoverTrigger asChild>
          <div class="p-4">
            <div
              class="flex items-center gap-2 text-black cursor-pointer hover:bg-neutral-50 rounded p-2"
            >
              <div
                class="bg-green-300 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white"
              >
                {{ name[0] }}
              </div>
              <p class="text-black text-sm font-bold">{{ name }}</p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent class="w-[150px]">
          <Button class="w-full" @click="logout" variant="destructive"
            >Log Out</Button
          >
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
