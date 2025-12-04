---
layout: page
permalink: /repositories/
title: repositories
description: My GitHub repositories and contributions.
nav: false
---

I'm gradually building my programming skills through personal projects. These repositories reflect my interest in computational physics and data analysis techniques.

{% if site.data.repositories.github_users %}

## GitHub Users

{% for user in site.data.repositories.github_users %}

<div class="github-user-grid" style="display:grid; gap:100px; grid-template-columns: 1fr 1fr;">

  <!-- LEFT: PROFILE INFO -->
  <div>
    {% include repository/repo_user_profile.liquid username=user %}
  </div>

  <!-- RIGHT: USER ACCOUNT STATS -->
  <div>
    {% include repository/repo_user_stats.liquid username=user %}
  </div>

</div>

<!-- STREAK -->
<div style="margin-top:20px; width:600px; margin-left:auto; margin-right:auto;">
  {% include repository/repo_user_streak.liquid username=user %}
</div>

<!-- SUMMARY SECTION -->
<div style="margin-top:40px;">
  {% include repository/repo_user_summary.liquid username=user %}
</div>

<hr style="margin:60px 0;">

{% endfor %}
{% endif %}

---
*This is an ongoing learning process — I welcome feedback and collaboration opportunities on any of these projects.*