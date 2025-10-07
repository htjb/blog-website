import glob

files = glob.glob('posts/*.md')
# Sort files by filename
files = sorted(files)
with open('posts/post-list.txt', 'w') as f:
    for file in files:
        f.write(file + '\n')
print(f'Wrote {len(files)} post filenames to posts/post-list.txt')

all_tags = set()
for file in files:
    with open(file) as f:
        lines = f.readlines()
        tags = lines[3].strip().replace('tags: ', '').split(', ')
        all_tags.update(tags)
all_tags = sorted(all_tags)
with open('posts/tag-list.txt', 'w') as f:
    for tag in all_tags:
        f.write(tag + '\n')
print(f'Wrote {len(all_tags)} unique tags to posts/tag-list.txt')