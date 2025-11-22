<template>
  <footer class="w-full bg-[#4e2a1e] text-[#f3e8d6] py-8">
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
      <div>
        <h3 class="text-xl font-semibold">Acervo Museu Sambaqui</h3>
        <p class="mt-2 text-sm leading-relaxed">Preservando memórias costeiras e a história da região.</p>
        <p class="mt-3 text-xs">© {{ year }} Acervo Museu Sambaqui</p>
      </div>

      <div>
        <h4 class="font-medium">Informações</h4>
        <ul class="mt-2 text-sm space-y-1">
          <li>Horário: Ter–Dom • 09:00–17:00</li>
          <li>Endereço: Rua Dona Francisca, 600 — Joinville, Santa Catarina</li>
          <li>Contato: (48) 9999-9999 • contato@sambaqui.org</li>
        </ul>
      </div>

      <div>
        <h4 class="font-medium">Siga-nos</h4>
        <div class="mt-3 flex gap-3">
          <a aria-label="Instagram" href="#" class="text-sm underline">Instagram</a>
          <a aria-label="Facebook" href="#" class="text-sm underline">Facebook</a>
          <a aria-label="YouTube" href="#" class="text-sm underline">YouTube</a>
        </div>
      </div>
    </div>


  </footer>
</template>

<script>
export default {
  name: 'FooterAcervoMuseuSambaqui',
  props: {
    // você pode sobrescrever o ano se quiser
    yearOverride: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    year () {
      return this.yearOverride || new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
footer { background: #4e2a1e; }
h3, h4 { color: #f3e8d6; }
a { color: #e8d5b7; }
</style>
