import os

files = ['index.html', 'about.html', 'journey.html', 'projects.html', 'skills.html', 'recognition.html', 'contact.html']
base_dir = r"d:\Personal\project\Portfolio\Claude"

for file in files:
    path = os.path.join(base_dir, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('href="#about"', 'href="about.html"')
    content = content.replace('href="#journey"', 'href="journey.html"')
    content = content.replace('href="#projects"', 'href="projects.html"')
    content = content.replace('href="#skills"', 'href="skills.html"')
    content = content.replace('href="#recognition"', 'href="recognition.html"')
    content = content.replace('href="#contact"', 'href="contact.html"')
    content = content.replace('href="#home"', 'href="index.html"')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
print("Replaced links in all files")
