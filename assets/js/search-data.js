// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "dropdown-projects",
              title: "projects",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/projects/";
              },
            },{id: "dropdown-github-repository",
              title: "github repository",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/repositories/";
              },
            },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-presentations",
          title: "presentations",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/presentations/";
          },
        },{id: "nav-theses",
          title: "theses",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/theses/";
          },
        },{id: "nav-certifications",
          title: "certifications",
          description: "Professional certifications and specialized training programs completed in particle physics, software development, and data analysis.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/certifications/";
          },
        },{id: "nav-curriculum-vitae",
          title: "Curriculum Vitae",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-excited-to-join-the-2025-cohort-of-the-machine-learning-zoomcamp-by-datatalks",
          title: 'Excited to join the 2025 cohort of the Machine Learning Zoomcamp by DataTalks...',
          description: "",
          section: "News",},{id: "news-i-ve-submitted-my-midterm-project-for-machine-learning-zoomcamp-the-pulsar-classifier-is-now-live-on-hugging-face",
          title: 'I’ve submitted my midterm project for Machine Learning Zoomcamp! The pulsar classifier is...',
          description: "",
          section: "News",},{id: "news-i-ve-published-my-first-article-on-medium-where-i-reflect-on-developing-my-pulsar-classification-midterm-project-for-the-ml-zoomcamp-you-can-read-it-here",
          title: 'I’ve published my first article on Medium 🌌, where I reflect on developing...',
          description: "",
          section: "News",},{id: "projects-antares-processing-pipeline",
          title: 'ANTARES Processing Pipeline',
          description: "A processing pipeline that converts ANTARES neutrino telescope data (AntDSTs) into a Swim-compatible format. It handles file merging, applies oscillation weights and corrections, and integrates ML-based NNFit reconstructions for analysis.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project_antares/";
            },},{id: "projects-tau-appearance-measurement",
          title: 'Tau Appearance Measurement',
          description: "This analysis investigates tau neutrino appearance from atmospheric neutrino oscillations using ANTARES. It evaluates reconstruction algorithms, implements quality cuts, and uses a profile likelihood approach to assess sensitivity to the νμ→ντ oscillation channel.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project_tau_appearance/";
            },},{id: "projects-km3net-orca-reconstruction-studies",
          title: 'KM3NeT/ORCA Reconstruction Studies',
          description: "An investigation into energy reconstruction biases for muon neutrinos in the ORCA6 detector. Identified track geometry relative to the sparse detector array as the primary cause of systematic energy miscalibrations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project_orca_energy_studies/";
            },},{id: "projects-acubesat-mission",
          title: 'AcubeSAT Mission',
          description: "A comprehensive radiation study for the AcubeSAT 3U CubeSat. Quantified flux, Total Ionizing Dose (TID), and shielding effectiveness for critical subsystems to guarantee mission success in Low Earth Orbit.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project_satellite_radiation/";
            },},{id: "projects-pulsar-star-classification",
          title: 'Pulsar Star Classification',
          description: "Machine learning system for classifying pulsar stars from astronomical data using the HTRU2 dataset",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_pulsar_classification/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/academic_cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%63%68%61%64%6F%6C%69%61%73@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/mchadolias", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/2685302", "_blank");
        },
      },{
        id: 'social-kaggle',
        title: 'Kaggle',
        section: 'Socials',
        handler: () => {
          window.open("https://www.kaggle.com/mchadolias", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/michael-chadolias", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0006-0373-049X", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
