'''
MIT License

Copyright (c) 2025 EletrixTime

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
'''
from flask import render_template, Blueprint,jsonify
import time
import psutil


stats_bp = Blueprint('stats', __name__)
@stats_bp.route('/stats/fetch')
def stats_fetch():
    cpu = psutil.cpu_percent(interval=0.5)
    ram = psutil.virtual_memory().percent
    net_io = psutil.net_io_counters()
    net_sent = net_io.bytes_sent
    net_recv = net_io.bytes_recv

    return jsonify({
        'cpu_percent': cpu,
        'ram_percent': ram,
        'net_sent': net_sent,
        'net_recv': net_recv
    })

@stats_bp.route("/stats")
def stats_views():
    return render_template("about/stats.html")