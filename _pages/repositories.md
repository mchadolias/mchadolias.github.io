---
layout: page
permalink: /repositories/
title: repositories
description: My GitHub repositories and contributions.
nav: false
---

I'm gradually building my programming skills through personal projects.  
These repositories reflect my interest in computational physics, data analysis, and software development.

{% if site.data.repositories.github_users %}
{% for user in site.data.repositories.github_users %}

<!-- ================================================= -->
<!-- 1️⃣ PROFILE (LEFT) — OVERVIEW (RIGHT)            -->
<!-- ================================================= -->

<div class="github-grid">

  <!-- LEFT: BIO / PROFILE -->
  <div>
    {% include repository/user_profile.liquid username=user %}
  </div>

  <!-- RIGHT: GENERAL OVERVIEW -->
  <div>
    {% include repository/user_stats.liquid username=user %}
  </div>

</div>

<div style="margin-top:35px;"></div>

<!-- ================================================= -->
<!-- 2️⃣ CONTRIBUTIONS + LANG / METRICS GRID          -->
<!-- ================================================= -->

<!-- Full-width contributions -->

{% include repository/repo_contributions.liquid username=user %}

<div style="margin-top:35px;"></div>

<!-- Two-column layout (languages + metrics) -->
<div class="github-grid">

  <div>
    {% include repository/repo_languages.liquid username=user %}
  </div>

  <div>
    {% include repository/repo_recent_projects.liquid username=user %}
  </div>

</div>

<hr style="margin:60px 0;">

{% endfor %}
{% endif %}

---

_This is an ongoing learning journey — I welcome feedback and collaboration opportunities on any of these projects._
