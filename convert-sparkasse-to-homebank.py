import sys
import csv

file_in = sys.argv[1]
file_out = file_in.replace('.csv', '-converted.csv')
fieldnames = ['date', 'payment', 'info', 'payee', 'memo', 'amount', 'category', 'tags']

with open(file_out, mode='w') as csv_out:
    with open(file_in) as csv_file:

        writer = csv.DictWriter(csv_out, fieldnames=fieldnames)
        writer.writeheader()

        reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in reader:
            if line_count == 0:
                line_count += 1
                continue
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
        print(f'Processed {line_count} lines.')
