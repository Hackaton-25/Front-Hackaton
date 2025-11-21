<script setup>
import FooterComponent from '../../components/ComponentesVisitante/FooterComponent.vue'
import HeaderComponent from '../../components/ComponentesVisitante/HeaderComponent.vue'

</script>

<template>
  <header>
    <HeaderComponent />
   </header>
  <main class="main-content container">
    <section class="intro-section">
      <div class="intro-text">
        <h1>
          Museu Arqueológico de
          <br>
          <span class="highlight">Sambaqui de Joinville</span>
        </h1>
        <p>Descubra um dos maiores acervos arqueológicos de Santa Catarina</p>
      </div>
      <div class="intro-image">
        <img
          src="@/assets/img/fossil.jpg"
          alt="Esqueleto fósil arqueológico"
        />
      </div>
    </section>

    <section class="stats-section">
      <div class="stat-item">
        <p class="stat-number">100 mil</p>
        <p class="stat-label">Peças no acervo</p>
      </div>
      <div class="stat-item">
        <p class="stat-number">41</p>
        <p class="stat-label">Sambaquis Mapeados</p>
      </div>
      <div class="stat-item">
        <p class="stat-number">2,78 M</p>
        <p class="stat-label">De reais investidos no novo prédio</p>
      </div>
    </section>
    <section class="sambaqui-section container">
    <div class="text-content">
      <h2>O que é <span class="highlight">Sambaqui</span></h2>
      <p>
        Sambaquis são montes artificiais formados por conchas, ossos, restos de alimentos e artefatos deixados por povos pré-históricos.
        Eles funcionavam como locais de habitação, sepultamento e refúgio, sendo importantes para o estudo da arqueologia brasileira. Muitos desses montes estão localizados na cidade de Joinville, onde fica o museu.
      </p>
    </div>
    <div class="image-content">
      <img src="@/assets/img/sambaqui2.jpg" alt="Imagem de sambaqui arqueológico" />
    </div>
  </section>

  <section class="sobre-museu-section container">
    <div class="image-content">
      <img src="@/assets/img/museu.jpg" alt="Foto do Museu Arqueológico" />
    </div>
    <div class="text-content">
      <h2>Sobre o <span class="highlight">Museu</span></h2>
      <p class="descricao">
        O Museu Arqueológico de Sambaqui de Joinville abriga um dos maiores acervos arqueológicos de Santa Catarina,
        preservando e expondo importantes vestígios da história pré-histórica da região.
      </p>
      <div class="contato">
        <h3>Contato</h3>
        <p>Endereço: Rua Dona Franscisca, 600, Joinville, Santa Catarina</p>
        <p>Telefone:  (47) 3433-0114</p>
        <p>Email: contato@museusambaqui.com.br</p>
      </div>
    </div>
  </section>


   <section class="location-section container">
    <div class="location-info">
      <h2 class="location-title">Localização do Museu</h2>
      <p class="location-address">
        Rua Dona Franscisca, 600 <br />
        Joinville, Santa Catarina
      </p>
    </div>
     
    <div class="location-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.9320087726987!2d-48.84556402536882!3d-26.29630406772988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dea65d53afe661%3A0x99b8367f75796ad1!2sMuseu%20Arqueol%C3%B3gico%20de%20Sambaqui%20de%20Joinville!5e0!3m2!1spt-BR!2sbr!4v1763755398412!5m2!1spt-BR!2sbr"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
  </main>
  <footer>
    <FooterComponent />
    </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  font-family: "Poppins", Arial;

}

.intro-section {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.intro-text {
  flex: 1;
  min-width: 280px;
}

.intro-text h1 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 10px;
  line-height: 1.2;
  color: #42342e;
}

.highlight {
  color: #b77f46; /* tom laranja marrom */
}

.intro-text p {
  font-weight: 400;
  font-size: 1.1rem;
  max-width: 400px;
}

.intro-image {
  flex: 1;
  min-width: 280px;
  text-align: right;
}

.intro-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.stats-section {
  display: flex;
  justify-content: space-around;
  gap: 40px;
  flex-wrap: wrap;
  text-align: center;
}

.stat-item {
  flex: 1;
  min-width: 160px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #926a36;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 1.1rem;
  font-weight: 400;
  color: #4a3c2b;
}
.location-section {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin: 40px 0;
  flex-wrap: wrap;
}

.location-info {
  flex: 1;
  min-width: 280px;
}

.location-title {
  color: #b77f46; /* marrom claro */
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.location-address {
  font-size: 1.1rem;
  line-height: 1.5;
  color: #4a3c2b; /* tom marrom escuro */
  white-space: pre-line; /* para respeitar quebras de linha no endereço */
}

.location-map {
  flex: 1;
  min-width: 320px;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

/* Responsivo */
@media (max-width: 768px) {
  .location-section {
    flex-direction: column;
    align-items: center;
  }
  .location-map,
  .location-info {
    max-width: 100%;
  }
  iframe {
    width: 100% !important;
    height: 300px !important;
  }
}

/* Responsive (para telas menores) */
@media (max-width: 768px) {
  .intro-section {
    flex-direction: column;
    text-align: center;
  }
  .intro-image {
    text-align: center;
  }
  .stats-section {
    flex-direction: column;
  }
  .stat-item {
    margin-bottom: 20px;
  }
}
.sambaqui-section {
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
  flex-wrap: wrap;
  font-family: Arial, sans-serif;
}

.text-content {
  flex: 1;
  min-width: 280px;
}

.text-content h2 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 16px;
  color: #42342e; /* tom marrom escuro */
}

.highlight {
  color: #b77f46; /* tom laranja marrom */
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.5;
  color: #4a3c2b;
  max-width: 500px;
}

.image-content {
  flex: 1;
  min-width: 280px;
  text-align: right;
}

.image-content img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

/* Responsivo */
@media (max-width: 768px) {
  .sambaqui-section {
    flex-direction: column;
    text-align: center;
  }
  .image-content {
    text-align: center;
  }
}
.sobre-museu-section {
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
  flex-wrap: wrap;
  font-family: Arial, sans-serif;
}

.image-content {
  flex: 1;
  min-width: 280px;
  text-align: left;
}

.image-content img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.text-content {
  flex: 1;
  min-width: 280px;
}

.text-content h2 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 16px;
  color: #42342e; /* tom marrom escuro */
}

.highlight {
  color: #b77f46; /* tom laranja marrom */
}

.descricao {
  font-size: 1.1rem;
  line-height: 1.5;
  color: #4a3c2b;
  margin-bottom: 24px;
  max-width: 500px;
}

.contato h3 {
  font-weight: 600;
  color: #b77f46;
  margin-bottom: 8px;
}

.contato p {
  font-size: 1rem;
  color: #4a3c2b;
  margin: 3px 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .sobre-museu-section {
    flex-direction: column;
    text-align: center;
  }
  .image-content {
    text-align: center;
  }
}
</style>


