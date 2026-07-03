import os
import glob
import re

html_files = glob.glob("*.html")

old_desktop_nav = """    <ul class="hidden md:flex items-center gap-1 text-sm">
      <li><a href="about.html" class="nav-link rounded-full px-3.5 py-1.5">About</a></li>
      <li><a href="journey.html" class="nav-link rounded-full px-3.5 py-1.5">Journey</a></li>
      <li><a href="projects.html" class="nav-link rounded-full px-3.5 py-1.5">Projects</a></li>
      <li><a href="skills.html" class="nav-link rounded-full px-3.5 py-1.5">Skills</a></li>
      <li><a href="recognition.html" class="nav-link rounded-full px-3.5 py-1.5">Recognition</a></li>
      <li><a href="contact.html" class="nav-link rounded-full px-3.5 py-1.5">Contact</a></li>
    </ul>"""

new_desktop_nav = """    <ul class="hidden md:flex items-center gap-1 text-sm">
      <li><a href="about.html" class="nav-link rounded-full px-3.5 py-1.5">About</a></li>
      <li><a href="work.html" class="nav-link rounded-full px-3.5 py-1.5">Work</a></li>
      <li><a href="research.html" class="nav-link rounded-full px-3.5 py-1.5">Research</a></li>
      <li><a href="startup.html" class="nav-link rounded-full px-3.5 py-1.5">Startup</a></li>
      <li><a href="photography.html" class="nav-link rounded-full px-3.5 py-1.5">Photography</a></li>
      <li><a href="journal.html" class="nav-link rounded-full px-3.5 py-1.5">Journal</a></li>
      <li><a href="contact.html" class="nav-link rounded-full px-3.5 py-1.5">Contact</a></li>
    </ul>"""

old_mobile_nav = """    <ul class="flex flex-col font-mono text-sm">
      <li><a href="about.html" class="block px-5 py-3 border-b border-white/5">About</a></li>
      <li><a href="journey.html" class="block px-5 py-3 border-b border-white/5">Journey</a></li>
      <li><a href="projects.html" class="block px-5 py-3 border-b border-white/5">Projects</a></li>
      <li><a href="skills.html" class="block px-5 py-3 border-b border-white/5">Skills</a></li>
      <li><a href="recognition.html" class="block px-5 py-3 border-b border-white/5">Recognition</a></li>
      <li><a href="contact.html" class="block px-5 py-3">Contact</a></li>
    </ul>"""

new_mobile_nav = """    <ul class="flex flex-col font-mono text-sm">
      <li><a href="about.html" class="block px-5 py-3 border-b border-white/5">About</a></li>
      <li><a href="work.html" class="block px-5 py-3 border-b border-white/5">Work</a></li>
      <li><a href="research.html" class="block px-5 py-3 border-b border-white/5">Research</a></li>
      <li><a href="startup.html" class="block px-5 py-3 border-b border-white/5">Startup</a></li>
      <li><a href="photography.html" class="block px-5 py-3 border-b border-white/5">Photography</a></li>
      <li><a href="journal.html" class="block px-5 py-3 border-b border-white/5">Journal</a></li>
      <li><a href="contact.html" class="block px-5 py-3">Contact</a></li>
    </ul>"""

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace(old_desktop_nav, new_desktop_nav)
    content = content.replace(old_mobile_nav, new_mobile_nav)
    
    # Also replace any other standalone links to projects.html to work.html
    content = content.replace('href="projects.html"', 'href="work.html"')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Updated {len(html_files)} files.")
