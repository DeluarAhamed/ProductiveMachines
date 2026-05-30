// Home page app
function App() {
  return (
    <ModalProvider>
      <div id="top">
        <Nav />
        <NavSpacer />
        <main>
          <Hero />
          <LogoCarousel />
          <HeroStatStrip />
          <Counter />
          <StoryStack />
          <Process />
          <Testimonial />
          <Products />
          <Blog />
          <ContactBand />
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
