
#!/bin/bash
echo "[*] Tracking RNG patterns from /dev/random..."
hexdump -C /dev/random | head -n 10
