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
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "My GitHub repositories and contributions.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
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
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-antares-processing-pipeline",
          title: 'ANTARES Processing Pipeline',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project_antares/";
            },},{id: "projects-tau-appearance-measurement",
          title: 'Tau Appearance Measurement',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project_tau_appearance/";
            },},{id: "projects-km3net-orca-reconstruction-studies",
          title: 'KM3NeT/ORCA Reconstruction Studies',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project_orca_energy_studies/";
            },},{id: "projects-space-environment-analysis-for-acubesat",
          title: 'Space Environment Analysis for AcubeSAT',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project_satellite_radiation/";
            },},{
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
