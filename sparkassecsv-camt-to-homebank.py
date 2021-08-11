import sys
import csv
import re

file_in = sys.argv[1]
ext_match = re.compile(re.escape('.csv'), re.IGNORECASE)
file_out = ext_match.sub('-converted.csv', file_in)
fieldnames = ['date', 'payment', 'info', 'payee', 'memo', 'amount', 'category', 'tags']
print(f'Writing to {file_out}')
with open(file_out, mode='w') as csv_out:
    with open(file_in) as csv_file:

        writer = csv.DictWriter(csv_out, fieldnames=fieldnames)
        writer.writeheader()

        reader = csv.reader(csv_file, delimiter=';')
        line_count = 0
        for row in reader:
            if line_count == 0:
                line_count += 1
                continue
            try:
                out_row = {
                    'date': row[1],
                    'payment': 0,
                    'info': '',
                    'payee': row[11],
                    'memo': row[4],
                    'amount': row[14],
                    'category': '',
                    'tags': ''
                }
                writer.writerow(out_row)
                print(f'Converted: {out_row}')
                line_count += 1
            except:
                e = sys.exc_info()[0]
                print(e)
        print(f'Processed {line_count} lines.')
