import glob

files = glob.glob('posts/*.md')
# Sort files by filename
files = sorted(files)
with open('posts/post-list.txt', 'w') as f:
    for file in files:
        f.write(file + '\n')
print(f'Wrote {len(files)} post filenames to posts/post-list.txt')